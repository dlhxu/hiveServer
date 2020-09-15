import requests
import bs4
from bs4 import BeautifulSoup
import pandas as pd
import time
import pgdb
import psycopg2
from datetime import date,timedelta
import nltk 
from nltk.tokenize import word_tokenize
from nltk import pos_tag
from nltk.stem import PorterStemmer
import csv
from selenium import webdriver

driver = webdriver.Chrome("C:/chromedriver_win32/chromedriver")

# key words / tags in tags database
tool_keywords1 = ['sales','IT','marketing','customer support','QA','cloud','AI','ML','design','python', 'sql',
 'aws', 'powerpoint', 'spark', 'java', 'nosql', 'docker', 'salesforce', 'scala', 'r',
 'c', 'c++', 'net', 'tableau', 'pandas', 'scikitlearn', 'sklearn', 'matlab', 'scala', 'keras', 'tensorflow',
 'vba', 'spss', 'linux', 'azure', 'cloud', 'gcp', 'mongodb', 'mysql', 'oracle', 
 'redshift', 'snowflake', 'kafka', 'javascript', 'qlik', 'jupyter', 'perl', 'bigquery', 'unix', 'react',
 'scikit', 'powerbi', 's3', 'ec2', 'kubernetes', 'django', 'github', 'git','airflow','nodejs', 'rstudio', 'hadoop', 'angular', 'node', 'firebase', 'php', 
 'kubeflow', 'postgressql', 'postgresql', 'postgres', 'ruby', 'julia', 'tensor','photoshop', 'backend','frontend','UI','UX',
 'sale','research','finance','excel','engineering', 'insurance', 'retail', 'investmnet' ]

tool_keywords2 = set(['amazon web services', 'google cloud', 'web development', 'business analyst', 'software developemnt', 
'business intelligence', 'data analyst','data science', 'artificial intelligence', 'machine learning','customer support',
'microsoft suite','supply chain',
'customer service','social media', 'business development','capital market', 'capital markets','human resources', 'human resource','Microsoft 365','quality assurance'])
ps = PorterStemmer()

def main():
  URL = 'https://ca.indeed.com/jobs?q=intern'
  page = requests.get(URL)

  #create db connection
  connection = psycopg2.connect(user="pmomwdqs",
                                  password="9oFWabALtltp-qm6KLKf0IjpKsBufd98",
                                  host="drona.db.elephantsql.com",
                                  port="5432",
                                  database="pmomwdqs") 


  employer_list, employer_list_no_duplicates, jobPostingList = create_employer_and_jobPosting_lists()
  
  #create df of employers to be inserted 
  columns = ["companyName"]
  employer_df = pd.DataFrame(employer_list_no_duplicates,columns = columns)
  
  for index, row in employer_df.iterrows():
    cursor = connection.cursor()
    cursor.execute("""INSERT INTO employer ("companyName") VALUES (%s);""" ,[row['companyName']])
    connection.commit()
    cursor.close()

  print("Employers are inserted into db")

  #fill job postings with empID
  filled_jobPostingList = fill_empid_jobPosting(jobPostingList,employer_list,connection)

  #create jobPosting df to be inserted
  columns = ["location","title","postingDate","applicationDeadline", "season","jobLength","description","jobApplicationUrl","logoUrl","employerID"]
  job_posting_df = pd.DataFrame(filled_jobPostingList,columns = columns)

  for index, row in job_posting_df.iterrows():
    cursor = connection.cursor()
    cursor.execute("""INSERT INTO "jobPosting" ("location","title","postingDate","applicationDeadline", "season","jobLength","description","jobApplicationUrl","logoUrl","employerID") VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);""" ,[row['location'],row['title'],row['postingDate'],row['applicationDeadline'],row['season'],row['jobLength'],row['description'],row['jobApplicationUrl'],row['logoUrl'],row['employerID']])
    cursor.close()
  
  print("job posting filled")
  connection.commit()
  
  #parse words in job desctiptions
  job_posting_df['job_description_word_set'] = job_posting_df['description'].map(prepare_job_desc)
  
  # process the tags
  tool_keywords1_set = set([ps.stem(tok) for tok in tool_keywords1]) # stem the keywords (since the job description is also stemmed.)
  tool_keywords1_dict = {ps.stem(tok):tok for tok in tool_keywords1} # use this dictionary to revert the stemmed words back to the original.
  
  cursor = connection.cursor()
  cursor.execute("""SELECT * from "jobPosting" """)
  job_postings = cursor.fetchall()
  cursor.close()
  
  for row in job_postings:
    i = job_postings.index(row)
    tool_list = []
    job_id = row[0]
    job_desc = row[6].lower()
    job_desc_set = job_posting_df.iloc[i]['job_description_word_set']

    
    # check if the keywords are in the job description. Look for exact match by token.
    tool_words = tool_keywords1_set.intersection(job_desc_set)
    tool_words_convert = []
    for tool in tool_words:
        tool_words_convert.append(tool_keywords1_dict[tool])

    # check if longer keywords (more than one word) are in the job description. Match by substring.
    j = 0
    for tool_keyword2 in tool_keywords2:
        # tool keywords.
        if tool_keyword2 in job_desc:
            tool_list.append(tool_keyword2)
            j += 1

    # label the job descriptions without any tool keywords.
    if len(tool_list) == 0 and j == 0 and len(tool_words_convert) == 0:
        tool_list.append('Other')

    tool_list += list(tool_words_convert)

    # insert tags
    for tool in tool_list:
      cursor = connection.cursor()
      cursor.execute("""SELECT "tagID" from tags where "tagName" = (%s)""" ,[tool])
      tag_id = cursor.fetchone()
      cursor.execute("""INSERT INTO "jobTags" ("jobID","tagID") VALUES (%s,%s);""" ,[job_id,tag_id[0]])
      connection.commit()

  print("job tags filled")
  connection.close()

def fill_empid_jobPosting(jobPosting_list,employer_list,connection):
  filled_jobPostings = []
  for unfilled_job_posting in jobPosting_list:
    cursor = connection.cursor()
    i = jobPosting_list.index(unfilled_job_posting)
    cursor.execute("""SELECT "employerID" from employer where "companyName" = (%s)""" ,[employer_list[i]])
    emp_id = cursor.fetchone()
    unfilled_job_posting.append(str(emp_id[0]))
    filled_jobPostings.append(unfilled_job_posting)

  return filled_jobPostings


def create_employer_and_jobPosting_lists(): 
  employer_list = []
  jobPosting_list = []

  # hardcode posting day and due date since information is not directly available
  today = date.today()
  d1 = today.strftime("%Y-%m-%d")
  deadline = today + timedelta(days=30)
  d2 = deadline.strftime("%Y-%m-%d")

  # loop through 20 pages of indeed 
  for i in range(0,200,10):
    #create url for page 
    URL = 'https://ca.indeed.com/jobs?q=intern&start=' + str(i)
    driver.get(URL)
    driver.implicitly_wait(10)
    all_jobs = driver.find_elements_by_class_name('result')
    
    # parse all jobs for needed information
    for job in all_jobs:
        result_html = job.get_attribute('innerHTML')
        soup = BeautifulSoup(result_html,'html.parser') 
        title = soup.find("a",class_="jobtitle").text.replace('\n','')
        location = soup.find(class_="location").text
        company = soup.find("span",class_="company").text.replace('\n','').strip()
        job_url = URL + "&vjk=" + soup.find("div",class_="recJobLoc")["id"][10:]
        
        employer_list.append(company)
        sum_div = job.find_elements_by_class_name("summary")[0]
        try:
          sum_div.click()
        except:
          close_button = driver.find_element_by_class_name('popover-x-button-close')
          close_button.click()
          sum_div.click()

        job_desc = driver.find_element_by_id('vjs-desc').text.replace('\n','')
        
        try:
            img = driver.find_element_by_id('vjs-img-cmL').get_attribute("src")
        except: 
            img = "NULL"
        #create jobPosting element and append
        jobPosting_list.append([location,title,d1,d2,"Summer 2020","4 months",job_desc,job_url,img])
    #remove duplicate employers
    employer_list_no_duplicates = list(dict.fromkeys(employer_list))
  return employer_list,employer_list_no_duplicates, jobPosting_list
  

# process the job description.
def prepare_job_desc(desc):
    # tokenize description.
    tokens = word_tokenize(desc)
        
    # Parts of speech (POS) tag tokens.
    token_tag = pos_tag(tokens)
    
    # Only include some of the POS tags.
    include_tags = ['VBN', 'VBD', 'JJ', 'JJS', 'JJR', 'CD', 'NN', 'NNS', 'NNP', 'NNPS']
    filtered_tokens = [tok for tok, tag in token_tag if tag in include_tags]
    
    # stem words.
    stemmed_tokens = [ps.stem(tok).lower() for tok in filtered_tokens]
    return set(stemmed_tokens)

# some logic taken from 
# https://towardsdatascience.com/how-to-use-nlp-in-python-a-practical-step-by-step-example-bd82ca2d2e1e

if __name__ == "__main__":
    main()

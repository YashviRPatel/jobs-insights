drop schema if exists Jobs_Insights;
create schema Jobs_Insights;
use Jobs_Insights;

drop table if exists country_names;
create table country_names(
	name varchar(100),
    code varchar(5) 
);
load data local infile 'C:/Users/hp/Documents/University Of Waterloo/UWaterloo Here/Winter 2023 (1231)/ECE 656/Project/Jobs Insights Project/ece656-project/glassdoor-dataset/country_names_2_digit_codes.csv'
into table country_names 
fields terminated by ',' 
enclosed by '"'
lines terminated by '\n'
ignore 1 lines
(name, code)
SET code = substring(code,1, length(code)-1);

drop table if exists currency_exchange;
create table currency_exchange(
	code varchar(5),
    country varchar(150),
    currency varchar(100),
    number double,
    exchange_rate double null
);

load data local infile 'C:/Users/hp/Documents/University Of Waterloo/UWaterloo Here/Winter 2023 (1231)/ECE 656/Project/Jobs Insights Project/ece656-project/glassdoor-dataset/currency_exchange.csv'
into table currency_exchange 
fields terminated by ',' 
enclosed by '"'
lines terminated by '\n'
ignore 1 lines
(@code, country, currency, @number, @exchange_rate)
SET exchange_rate = NULLIF(@exchange_rate,0), number = NULLIF(@number,0), code = NULLIF(@code,'');


drop table if exists benefits_comments;
create table benefits_comments(
	bc_id int,
    bc_city varchar(30),
    bc_comment TEXT,
    bc_date datetime,
    bc_current_job varchar(10),
    bc_job_title text,
    bc_rating double,
    bc_state varchar(30)
);

load data local infile 'C:/Users/hp/Documents/University Of Waterloo/UWaterloo Here/Winter 2023 (1231)/ECE 656/Project/Jobs Insights Project/ece656-project/glassdoor-dataset/glassdoor_benefits_comments.csv'
into table benefits_comments 
fields terminated by ',' 
enclosed by '"'
-- lines terminated by '\n'
ESCAPED BY '\\'
LINES TERMINATED BY '\r\n'
ignore 1 lines
(bc_id, @dummy_column, @bc_city, @bc_comment, @bc_date, @bc_current_job,@bc_job_title,@bc_rating,@bc_state)
SET bc_city = NULLIF(@bc_city,''), 
bc_comment = NULLIF(@bc_comment,''),
bc_date = NULLIF(@bc_date,''),
bc_current_job = NULLIF(@bc_current_job,''),
bc_job_title = NULLIF(@bc_job_title, ''),
bc_rating = NULLIF(@bc_rating, 0),
bc_state = NULLIF(@bc_state, '');

drop table if exists benefits_highlights;
create table benefits_highlights(
	bh_id int,
    bh_phrase text,
    bh_name varchar(50),
    bh_count int
);

load data local infile 'C:/Users/hp/Documents/University Of Waterloo/UWaterloo Here/Winter 2023 (1231)/ECE 656/Project/Jobs Insights Project/ece656-project/glassdoor-dataset/glassdoor_benefits_highlights.csv'
into table benefits_highlights 
fields terminated by ',' 
enclosed by '"'
-- lines terminated by '\n'
ESCAPED BY '\\'
LINES TERMINATED BY '\r\n'
ignore 1 lines
(bh_id, @bh_phrase, @dummy_column, @bh_name, @dummy_column, @bh_count)
SET bh_phrase = NULLIF(@bh_phrase,''), 
bh_name = NULLIF(@bh_name,''),
bh_count = NULLIF(@bh_count, 0);

drop table if exists overview_competitors;
create table overview_competitors(
	oc_id int,
    oc_name varchar(60)
);

load data local infile 'C:/Users/hp/Documents/University Of Waterloo/UWaterloo Here/Winter 2023 (1231)/ECE 656/Project/Jobs Insights Project/ece656-project/glassdoor-dataset/glassdoor_overview_competitors.csv'
into table overview_competitors 
fields terminated by ',' 
enclosed by '"'
-- lines terminated by '\n'
ESCAPED BY '\\'
LINES TERMINATED BY '\r\n'
ignore 1 lines
(oc_id, @dummy_column,@oc_name)
SET 
oc_name = NULLIF(@oc_name,'');

select * from overview_competitors limit 20;

drop table if exists photos;
create table photos(
	p_id int,
    p_caption text,
    p_photo_id bigint,
    p_photo_url varchar(200)
);

load data local infile 'C:/Users/hp/Documents/University Of Waterloo/UWaterloo Here/Winter 2023 (1231)/ECE 656/Project/Jobs Insights Project/ece656-project/glassdoor-dataset/glassdoor_photos.csv'
into table photos 
fields terminated by ',' 
enclosed by '"'
-- lines terminated by '\n'
ESCAPED BY '\\'
LINES TERMINATED BY '\r\n'
ignore 1 lines
(p_id, @dummy_column,@p_caption, @p_photo_id, @dummy_column, @dummy_column,@p_photo_url, @dummy_column)
SET 
p_caption = NULLIF(@p_caption,''),
p_photo_id = NULLIF(@p_photo_id, 0),
p_photo_url = NULLIF(@p_photo_url,'');



drop table if exists reviews;
create table reviews(
	r_id int,
    r_cons text,
    r_date varchar(50),
    r_is_featured varchar(10),
    r_helpful_count int,
    r_response_id bigint,
    r_pros text,
    r_publish varchar(50),
    r_publisher text,
    r_company_rating double
);

load data local infile 'C:/Users/hp/Documents/University Of Waterloo/UWaterloo Here/Winter 2023 (1231)/ECE 656/Project/Jobs Insights Project/ece656-project/glassdoor-dataset/glassdoor_reviews.csv'
into table reviews 
fields terminated by ',' 
optionally enclosed by '\"'
enclosed by '"'
-- ESCAPED BY '\\'
ESCAPED BY '"'
lines terminated by '\n'
-- ESCAPED BY '\\'
-- LINES TERMINATED BY '\r\n'
ignore 1 lines
(r_id ,@dummy,@r_cons, @r_date, @r_is_featured, @r_helpful_count, @r_response_id, @r_pros, @r_publish, @r_publisher, @dummy,@dummy,@dummy, @r_company_rating,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy)
SET 
r_cons = NULLIF(@r_cons,''),
r_date = NULLIF(@r_date,''),
r_is_featured = NULLIF(@r_is_featured,''),
r_helpful_count = NULLIF(@r_helpful_count,0),
r_response_id = NULLIF(@r_response_id,0),
r_pros = NULLIF(@r_pros,''),
r_publish = NULLIF(@r_publish,'') ,
r_publisher = NULLIF(@r_publisher,'') ,
r_company_rating = NULLIF(@r_company_rating,0);

drop table if exists reviews_responses;
create table reviews_responses(
	rr_id int,
    rr_date datetime,
    rr_helpful_count int,
    rr_job_title text,
    rr_not_helpful_count int,
    rr_response_text text,
    rr_update datetime
);

load data local infile 'C:/Users/hp/Documents/University Of Waterloo/UWaterloo Here/Winter 2023 (1231)/ECE 656/Project/Jobs Insights Project/ece656-project/glassdoor-dataset/glassdoor_reviews_val_reviewResponses.csv'
into table  reviews_responses
fields terminated by ',' 
enclosed by '"'
-- lines terminated by '\n'
ESCAPED BY '\\'
LINES TERMINATED BY '\r\n'
ignore 1 lines
(rr_id, @d, @rr_date, @rr_helpful_count, @rr_job_title, @rr_not_helpful_count, @rr_response_text, @d, @d, @rr_update)
SET 
rr_date = NULLIF(@rr_date,''),
rr_helpful_count = NULLIF(@rr_helpful_count, 0),
rr_job_title = NULLIF(@rr_job_title,''),
rr_not_helpful_count = NULLIF(@rr_not_helpful_count,0),
rr_response_text = NULLIF(@rr_response_text,''),
rr_update = NULLIF(@rr_update,'');


drop table if exists salary;
create table salary (
	s_id int,
    s_base_pay_count int,
    s_job_title text,
    s_pay_period varchar(30),
    s_pay_percentile_ten double,
    s_pay_percentile_ninety double,
    s_pay_percentile_fifty double,
    s_who_reported varchar(60)
);

load data local infile 'C:/Users/hp/Documents/University Of Waterloo/UWaterloo Here/Winter 2023 (1231)/ECE 656/Project/Jobs Insights Project/ece656-project/glassdoor-dataset/glassdoor_salary_salaries.csv'
into table  salary
fields terminated by ',' 
enclosed by '"'
-- lines terminated by '\n'
ESCAPED BY '\\'
LINES TERMINATED BY '\r\n'
ignore 1 lines
(s_id, @d, @s_base_pay_count, @s_job_title, @s_pay_period, @s_pay_percentile_ten, @s_pay_percentile_ninety, @s_pay_percentile_fifty, @s_who_reported)
SET 
s_base_pay_count = NULLIF(@s_base_pay_count,0),
s_job_title = NULLIF(@s_job_title, ''),
s_pay_period = NULLIF(@s_pay_period,''),
s_pay_percentile_ten = NULLIF(@s_pay_percentile_ten,0),
s_pay_percentile_ninety = NULLIF(@s_pay_percentile_ninety,0),
s_pay_percentile_fifty = NULLIF(@s_pay_percentile_fifty,0),
s_who_reported = NULLIF(@s_who_reported,'');

-- drop table if exists header;


drop table if exists glassdoor;
create table glassdoor(
	benefits_rating double,
    benefits_comments_id int,
    benefits_highlights_id int,
    benefits_num_rating int,
    benefits_employer_summary text,
    
    
    
    header_employer_id bigint,
    header_employer_name  varchar(200),
    header_job_expired varchar (100),
    header_job_title varchar(200),
    header_location_id bigint, 
    header_location_city varchar(150), 
    header_company_logo varchar(200),
    header_jobs_posted_date varchar(100), 
    header_company_rating double,
    header_company_sponsored varchar(10),
    header_company_featured_video_url varchar (200),
    header_pay_high int, 
    header_pay_low int, 
    header_pay_med int, 
    header_pay_period varchar(20), 
    header_salary_high int,
    header_salary_low int,
    header_salary_source varchar(100), 
    
    job_description text, 
    job_discover_date varchar(50),
    job_source varchar(100),
    job_title_id bigint,
    job_listing_id bigint, 
    
    map_country varchar (100),
    
    
    overview_company_foundation_year int, 
    overview_company_headquarters varchar(100),
    overview_company_industry varchar(100), 
    overview_industry_id int, 
    overview_company_revenue varchar(100), 
    overview_company_sector varchar(100), 
    overview_company_sector_id int, 
    overview_company_size varchar(50), 
    overview_company_type varchar(100),
    overview_company_description text,
    overview_company_website_url text,
    overview_company_competitors int, 
    overview_company_video_url varchar (200),
    
    photos_id int,
    
    
    reviews_id int,
    

    salary_country_currency_id int,
    salary_country_currency_name varchar(30),
    salary_country_currency_symbol varchar(30),
    salary_country_currency_code varchar(10),
    salary_country_default_name varchar(30),
    salary_country_id int,
    salary_country_name varchar(30),
    salary_currency_id int,
    salary_currency_name varchar(100),
    salary_currency_symbol varchar (10),  
    salary_last_salary_date datetime,
    salary_salaries_id int
);


load data local infile 'C:/Users/hp/Documents/University Of Waterloo/UWaterloo Here/Winter 2023 (1231)/ECE 656/Project/Jobs Insights Project/ece656-project/glassdoor-dataset/glassdoor.csv'
into table  glassdoor
fields terminated by ','
optionally enclosed by '\"'
enclosed by '"'
ESCAPED BY '\\'
LINES TERMINATED BY '\n'
ignore 1 lines
(@benefits_rating,@benefits_comments_id,@benefits_highlights_id,@benefits_num_rating,@benefits_employer_summary,@d,@d,@d,@d,@d,@d,@d,@d,@d,@d,@d,@d,@d,@d,@d,@d,@d,@d,@d,@d,@d,@d,@d,@d,@d,@d,@d,@d,@d,@d,@d,@d,@d,@d,@header_employer_id,@header_employer_name,@header_job_expired,@d,@d,@header_job_title,@header_location_id,@header_location_city,@d,@header_company_logo,@d,@d,@d,@header_jobs_posted_date,@header_company_rating,@d,@d,@d,@header_company_sponsored,@d,@d,@header_company_featured_video_url,@d,@d,@d,@d,@d,@header_pay_high,@header_pay_low,@header_pay_med,@header_pay_period,@header_salary_high,@header_salary_low,@header_salary_source,@job_description,@job_discover_date,@d,@d,@d,@d,@job_source,@job_title_idd,@job_listing_id,@d,@map_country,@d,@d,@d,@d,@d,@d,@d,@d,@d,@d,@overview_company_foundation_year,@overview_company_headquarters,@overview_company_industry,@overview_industry_id,@overview_company_revenue,@overview_company_sector,@overview_company_sector_id,@overview_company_size,@d,@overview_company_type,@overview_company_description,@d,@overview_company_website_url,@d,@overview_company_competitors,@overview_company_video_url,@photos_id,@d,@d,@d,@d,@d,@d,@d,@reviews_id,@d,@d,@d,@d,@d,@d,@d,@d,@d,@d,@salary_country_currency_id,@salary_country_currency_name,@d,@d,@d,@salary_country_currency_symbol,@salary_country_currency_code,@d,@salary_country_default_name,@d,@d,@salary_country_id,@d,@d,@salary_country_name,@d,@d,@d,@d,@d,@d,@d,@d,@d,@d,@salary_currency_id,@salary_currency_name,@d,@d,@d,@salary_currency_symbol,@salary_last_salary_date,@salary_salaries_id,@d)
SET 
benefits_rating = NULLIF(@benefits_rating,0),
benefits_comments_id = NULLIF(@benefits_comments_id,0),
benefits_highlights_id = NULLIF(@benefits_highlights_id,0),
benefits_num_rating = NULLIF(@benefits_num_rating,0),
benefits_employer_summary = NULLIF(@benefits_employer_summary,''),
header_employer_id = NULLIF(@header_employer_id,0),
header_employer_name = NULLIF(@header_employer_name,''),
header_job_expired = NULLIF(@header_job_expired,''),
header_job_title = NULLIF(@header_job_title,''),
header_location_id = NULLIF(@header_location_id,0),
header_location_city = NULLIF(@header_location_city,''),
header_company_logo = NULLIF(@header_company_logo,''),
header_jobs_posted_date = NULLIF(@header_jobs_posted_date,''),
header_company_rating = NULLIF(@header_company_rating,0),
header_company_sponsored = NULLIF(@header_company_sponsored,''),
header_company_featured_video_url = NULLIF(@header_company_featured_video_url,''),
header_pay_high = NULLIF(@header_pay_high,0),
header_pay_low = NULLIF(@header_pay_low,0),
header_pay_med = NULLIF(@header_pay_med,0),
header_pay_period = NULLIF(@header_pay_period,''),
header_salary_high = NULLIF(@header_salary_high,0),
header_salary_low = NULLIF(@header_salary_low,0),
header_salary_source = NULLIF(@header_salary_source,''),
job_description = NULLIF(@job_description,''),
job_discover_date = NULLIF(@job_discover_date,''),
job_source = NULLIF(@job_source,''),
job_title_id = NULLIF(@job_title_id,0),
job_listing_id = NULLIF(@job_listing_id,0),
map_country = NULLIF(@map_country,''),
overview_company_foundation_year = NULLIF(@overview_company_foundation_year,0),
overview_company_headquarters = NULLIF(@overview_company_headquarters,''),
overview_company_industry = NULLIF(@overview_company_industry,''),
overview_industry_id = NULLIF(@overview_industry_id,0),
overview_company_revenue = NULLIF(@overview_company_revenue,''),
overview_company_sector = NULLIF(@overview_company_sector,''),
overview_company_sector_id = NULLIF(@overview_company_sector_id,0),
overview_company_size = NULLIF(@overview_company_size,''),
overview_company_type = NULLIF(@overview_company_type,''),
overview_company_description = NULLIF(@overview_company_description,''),
overview_company_website_url = NULLIF(@overview_company_website_url,''),
overview_company_competitors = NULLIF(@overview_company_competitors,0),
overview_company_video_url = NULLIF(@overview_company_video_url,''),
photos_id = NULLIF(@photos_id,0),
reviews_id = NULLIF(@reviews_id,0),
salary_country_currency_id = NULLIF(@salary_country_currency_id,0),
salary_country_currency_name = NULLIF(@salary_country_currency_name,''),
salary_country_currency_symbol = NULLIF(@salary_country_currency_symbol,''),
salary_country_currency_code = NULLIF(@salary_country_currency_code,''),
salary_country_default_name = NULLIF(@salary_country_default_name,''),
salary_country_id = NULLIF(@salary_country_id,0),
salary_country_name = NULLIF(@salary_country_name,''),
salary_currency_id = NULLIF(@salary_currency_id,0),
salary_currency_name = NULLIF(@salary_currency_name,''),
salary_currency_symbol = NULLIF(@salary_currency_symbol,''),
salary_last_salary_date = NULLIF(@salary_last_salary_date,''),
salary_salaries_id = NULLIF(@salary_salaries_id,0);

drop table if exists company;
create table company (
	

	benefits_rating double,
    -- benefits_comments_id int, -- many comments_id for single employer_id
    -- benefits_highlights_id int,  -- many highlights_id for single employer_id
    benefits_num_rating int,
    benefits_employer_summary text,
    
	header_employer_id bigint,
    header_employer_name  varchar(200),
  
    header_company_logo varchar(200),
  
	header_company_rating double,
    header_company_featured_video_url varchar (200),
    
    overview_company_foundation_year int, 
    overview_company_headquarters varchar(100),
    overview_company_industry varchar(100), 
    overview_industry_id int, 
    overview_company_revenue varchar(100), 
    overview_company_sector varchar(100), 
    overview_company_sector_id int, 
    overview_company_size varchar(50), 
    overview_company_type varchar(100),
    overview_company_description text,
    overview_company_website_url text,
    -- overview_company_competitors int, -- multiple competitors_id for single employer_id
    overview_company_video_url varchar (200)
    
    -- photos_id int, -- multiple photos_id for single employer_id
	-- reviews_id int -- multiple reviews_id for single employer_id
);



-- inserting into company table from glassdoor
insert into company (benefits_rating,
    benefits_num_rating,
    benefits_employer_summary,
    
    header_employer_id,
    header_employer_name,
  
    header_company_logo,
  
    header_company_rating,
    header_company_featured_video_url,
    
    overview_company_foundation_year, 
    overview_company_headquarters,
    overview_company_industry, 
    overview_industry_id, 
    overview_company_revenue, 
    overview_company_sector, 
    overview_company_sector_id, 
    overview_company_size, 
    overview_company_type,
    overview_company_description,
    overview_company_website_url,
    overview_company_video_url)

select     
benefits_rating,
    benefits_num_rating,
    benefits_employer_summary,
    
    header_employer_id,
    header_employer_name,
  
    header_company_logo,
  
    header_company_rating,
    header_company_featured_video_url,
    
    overview_company_foundation_year, 
    overview_company_headquarters,
    overview_company_industry, 
    overview_industry_id, 
    overview_company_revenue, 
    overview_company_sector, 
    overview_company_sector_id, 
    overview_company_size, 
    overview_company_type,
    overview_company_description,
    overview_company_website_url,
    overview_company_video_url

from glassdoor;


delete from company where header_employer_id is null;


drop table if exists company_unique;

CREATE TABLE company_unique like company;

alter table company_unique add primary key(header_employer_id);

replace INTO company_unique (benefits_rating,
    benefits_num_rating,
    benefits_employer_summary,
    
    header_employer_id,
    header_employer_name,
  
    header_company_logo,
  
    header_company_rating,
    header_company_featured_video_url,
    
    overview_company_foundation_year, 
    overview_company_headquarters,
    overview_company_industry, 
    overview_industry_id, 
    overview_company_revenue, 
    overview_company_sector, 
    overview_company_sector_id, 
    overview_company_size, 
    overview_company_type,
    overview_company_description,
    overview_company_website_url,
    overview_company_video_url)

SELECT benefits_rating,
    benefits_num_rating,
    benefits_employer_summary,
    
    header_employer_id,
    header_employer_name,
  
    header_company_logo,
  
    header_company_rating,
    header_company_featured_video_url,
    
    overview_company_foundation_year, 
    overview_company_headquarters,
    overview_company_industry, 
    overview_industry_id, 
    overview_company_revenue, 
    overview_company_sector, 
    overview_company_sector_id, 
    overview_company_size, 
    overview_company_type,
    overview_company_description,
    overview_company_website_url,
    overview_company_video_url
FROM company;

-- select header_employer_id, count(*) as count from company_unique group by header_employer_id having count(*) >1 ;

drop table if exists job_listings;
create table job_listings(
header_employer_id bigint,
map_country varchar (100),
header_job_expired varchar (100),
header_job_title varchar(200),
header_location_id bigint, 
header_location_city varchar(150), 
header_jobs_posted_date varchar(100), 
header_pay_high int, 
header_pay_low int, 
header_pay_med int, 
header_pay_period varchar(20), 
header_salary_high int,
header_salary_low int,
header_salary_source varchar(100), 
job_description text, 
job_discover_date varchar(50),
job_source varchar(100),
job_title_id bigint,
job_listing_id bigint
);

insert into  job_listings(header_employer_id, map_country,header_job_expired ,
header_job_title ,
header_location_id , 
header_location_city , 
header_jobs_posted_date , 
header_pay_high , 
header_pay_low , 
header_pay_med , 
header_pay_period , 
header_salary_high ,
header_salary_low ,
header_salary_source , 
job_description , 
job_discover_date ,
job_source ,
job_title_id ,
job_listing_id)
SELECT header_employer_id, map_country,header_job_expired ,
header_job_title ,
header_location_id , 
header_location_city , 
header_jobs_posted_date , 
header_pay_high , 
header_pay_low , 
header_pay_med , 
header_pay_period , 
header_salary_high ,
header_salary_low ,
header_salary_source , 
job_description , 
job_discover_date ,
job_source ,
job_title_id ,
job_listing_id from glassdoor;

delete from job_listings where job_listing_id is null;

drop table if exists job_listings_unique;
CREATE TABLE job_listings_unique like job_listings;
alter table job_listings_unique add primary key(job_listing_id);
replace INTO job_listings_unique (header_employer_id, map_country,header_job_expired ,
header_job_title ,
header_location_id , 
header_location_city , 
header_jobs_posted_date , 
header_pay_high , 
header_pay_low , 
header_pay_med , 
header_pay_period , 
header_salary_high ,
header_salary_low ,
header_salary_source , 
job_description , 
job_discover_date ,
job_source ,
job_title_id ,
job_listing_id)

SELECT header_employer_id, map_country,header_job_expired ,
header_job_title ,
header_location_id , 
header_location_city , 
header_jobs_posted_date , 
header_pay_high , 
header_pay_low , 
header_pay_med , 
header_pay_period , 
header_salary_high ,
header_salary_low ,
header_salary_source , 
job_description , 
job_discover_date ,
job_source ,
job_title_id ,
job_listing_id
from job_listings;

-- select job_listing_id, count(*) as count from job_listings_unique group by job_listing_id having count(*) >1 ;

-- Mapping EmployerID of reviewsID from glassdoor to reviews table.

drop table if exists reviews_with_employer;
 create table reviews_with_employer as (
 
 select
 header_employer_id,
 r_id ,
    r_cons,
    r_date ,
    r_is_featured,
    r_helpful_count,
    r_response_id ,
    r_pros ,
    r_publish ,
    r_publisher,
    r_company_rating 
 from reviews inner join glassdoor on reviews.r_id = glassdoor.reviews_id
 );
 
 ALTER TABLE reviews_with_employer ADD COLUMN re_id_unique INT AUTO_INCREMENT PRIMARY KEY;
 
 drop table if exists photos_with_employer;
 create table photos_with_employer as (
 select
 header_employer_id,
 p_id,
    p_caption,
    p_photo_id,
    p_photo_url
    from photos inner join glassdoor on photos.p_id = glassdoor.photos_id
 );
 ALTER TABLE photos_with_employer ADD COLUMN pe_id_unique INT AUTO_INCREMENT PRIMARY KEY;
drop table if exists salary_with_employer;
create table salary_with_employer as (
	select 
    header_employer_id,
    s_id,
    s_base_pay_count,
    s_job_title,
    s_pay_period,
    s_pay_percentile_ten,
    s_pay_percentile_ninety,
    s_pay_percentile_fifty,
    s_who_reported
    from salary inner join glassdoor on salary.s_id = glassdoor.salary_salaries_id
);

delete from salary_with_employer where s_job_title is null;

ALTER TABLE salary_with_employer ADD COLUMN s_id_unique INT AUTO_INCREMENT PRIMARY KEY;


drop table if exists benefits_comments_with_employer;
create table benefits_comments_with_employer as (
	select 
    header_employer_id,
    bc_id,
    bc_city ,
    bc_comment ,
    bc_date ,
    bc_current_job ,
    bc_job_title ,
    bc_rating ,
    bc_state
    from benefits_comments inner join glassdoor on benefits_comments.bc_id = glassdoor.benefits_comments_id
);

ALTER TABLE benefits_comments_with_employer ADD COLUMN bce_id_unique INT AUTO_INCREMENT PRIMARY KEY;


drop table if exists benefits_highlights_with_employer;
create table benefits_highlights_with_employer as (
	select 
    header_employer_id,
    bh_id ,
    bh_phrase ,
    bh_name,
    bh_count 
    from benefits_highlights inner join glassdoor on benefits_highlights.bh_id = glassdoor.benefits_highlights_id
);

ALTER TABLE benefits_highlights_with_employer ADD COLUMN bhe_id_unique INT AUTO_INCREMENT PRIMARY KEY;

drop table if exists job_listings_unique_with_country_code;
create table job_listings_unique_with_country_code as (
	select * from job_listings_unique left outer join country_names on job_listings_unique.map_country = country_names.code or job_listings_unique.map_country = country_names.name
);

alter table country_names 
add constraint pk_contry_names primary key (name);

delete from currency_exchange where code is null;

set foreign_key_checks = 0;
alter table currency_exchange
add constraint pk_currency_exchange primary key (code,country),
add constraint fk_currency_exchange foreign key(country) references country_names(name) on update cascade on delete cascade;
set foreign_key_checks =1;

alter table overview_competitors
add constraint pk_overview_competitors primary key (oc_id, oc_name);

alter table reviews_responses
add constraint pk_reviews_responses primary key (rr_id),
add constraint fk_reviews_responses foreign key(rr_id) references reviews_with_employer(r_id) on update cascade on delete cascade;

alter table company_unique
add constraint pk_company_unique primary key (header_employer_id);


-- alter table reviews_with_employer
-- add constraint fk_reviews_with_employer foreign key(header_employer_id) references company_unique(header_employer_id);
-- ALTER TABLE reviews_with_employer
-- DROP FOREIGN KEY fk_reviews_with_employer_one;


alter table photos_with_employer
add constraint fk_photos_with_employer foreign key(header_employer_id) references company_unique(header_employer_id);

alter table salary_with_employer
add constraint fk_salary_with_employer foreign key(header_employer_id) references company_unique(header_employer_id);

alter table benefits_comments_with_employer
add constraint fk_benefits_comments_with_employer foreign key(header_employer_id) references company_unique(header_employer_id);

alter table benefits_highlights_with_employer
add constraint fk_benefits_highlights_with_employer foreign key(header_employer_id) references company_unique(header_employer_id);


alter table job_listings_unique_with_country_code
-- add constraint fk_job_listings_unique_with_country_code foreign key(header_employer_id) references company_unique(header_employer_id),
add constraint fk_job_listings_unique_with_country_code_one foreign key(name) references country_names(name);


drop table if exists data_for_data_mining_exercise;
create table data_for_data_mining_exercise as (

	select 
    -- header_employer_id, 
    -- header_employer_name, 
    -- overview_company_foundation_year,
	overview_company_industry,
	-- overview_company_revenue,
	overview_company_size, 
	overview_company_type,
    overview_company_headquarters,
    s_job_title,
    -- s_pay_percentile_ten,
    s_pay_percentile_ninety 
    from salary_with_employer left outer join company_unique using (header_employer_id)

); 

select 
-- "header_employer_id", 
-- "header_employer_name", 
-- "overview_company_foundation_year",
"overview_company_industry",
-- "overview_company_revenue",
"overview_company_size", 
"overview_company_type",
"overview_company_headquarters",
"s_job_title",
-- "s_pay_percentile_ten",
"s_pay_percentile_ninety" 

union

select 
-- header_employer_id, 
-- header_employer_name, 
-- overview_company_foundation_year,
overview_company_industry,
-- overview_company_revenue,
overview_company_size, 
overview_company_type,
overview_company_headquarters,
s_job_title,
-- s_pay_percentile_ten,
s_pay_percentile_ninety 
into outfile 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/data_for_data_mining.csv'
fields terminated by ','
optionally enclosed by '"'
lines terminated by '\n'
from data_for_data_mining_exercise;


drop table if exists data_for_reviews_sentimental_analysis;
create table data_for_reviews_sentimental_analysis as (
select 
    header_employer_name,
    r_cons,
    r_pros,
    r_company_rating
    from reviews_with_employer left outer join company_unique using (header_employer_id)

); 
delete from data_for_reviews_sentimental_analysis where header_employer_name is NULL and r_cons is NULL and r_pros is NULL and r_company_rating is NULL;

select 
    "header_employer_name",
    "r_cons",
    "r_pros",
    "r_company_rating"
    union
    select 
    header_employer_name,
	-- r_cons,
    -- r_pros,
    Replace(REPLACE(REPLACE(r_cons, '\r', ''), '\n', ''), ',', ' '),
    Replace(REPLACE(REPLACE(r_pros, '\r', ''), '\n', ''), ',', ' '),
    -- r_company_rating
    IFNULL(r_company_rating, 0) AS r_company_rating
   
into outfile 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/reviews_sentimental_analysis.csv'
fields terminated by ','
enclosed by '"'
ESCAPED BY '\\'
lines terminated by '\n'
from data_for_reviews_sentimental_analysis;

-- trigger on reviews_with_emplyer to check company rating

DELIMITER $$
CREATE TRIGGER check_company_rating 
BEFORE INSERT ON reviews_with_employer 
FOR EACH ROW 
BEGIN 
    IF NEW.r_company_rating < 0 OR NEW.r_company_rating > 5 THEN 
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Company rating must be between 0 and 5.'; 
    END IF; 
END$$
DELIMITER ;

-- -- test case to check the trigger
-- INSERT INTO reviews_with_employer
-- (header_employer_id, r_id, r_cons, r_date, r_is_featured, r_helpful_count, 
-- r_response_id, r_pros, r_publish, r_publisher, r_company_rating) 
-- VALUES 
-- (999, 1, 'Some cons here', '2023-04-17', 0, 0, NULL, 'Some pros here', 1, 
-- 'John Doe', 6);

-- creating indexes

CREATE INDEX idx_header_employer_id ON company_unique(header_employer_id);

CREATE INDEX idx_header_employer_name ON company_unique(header_employer_name);

CREATE INDEX idx_s_job_title ON salary_with_employer(s_job_title(100)); -- 100 mentioned because datatype of s_job_title is TEXT

CREATE INDEX idx_header_job_title ON job_listings_unique_with_country_code(header_job_title);



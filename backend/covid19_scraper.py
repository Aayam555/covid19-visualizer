from bs4 import BeautifulSoup
import requests


def scrape_covid19_data():
    # Getting html page from https://www.worldometers.info/coronavirus
    data = requests.get('https://www.worldometers.info/coronavirus')

    # Creating Soup
    soup = BeautifulSoup(data.text, 'lxml')

    # Getting Table
    table = soup.select('#main_table_countries_today > tbody:nth-child(2)')

    # Getting Covid Cases of all the countries
    covid_cases_table_row = table[0].find_all('tr')

    # Creating Covid-19 Cases Data List
    covid_cases = []
    for i in range(len(covid_cases_table_row)):
        covid_data = covid_cases_table_row[i].find_all('td')
        sn = covid_data[0].getText()
        country_name = covid_data[1].getText()
        cases = covid_data[2].getText()
        covid_case_dict = {
            "SN": sn, "country_name": country_name, "cases": cases}

        covid_cases.append(covid_case_dict)

    return covid_cases


if __name__ == "__main__":
    scrape_covid19_data()

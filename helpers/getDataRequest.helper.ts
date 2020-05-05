import StateNames from './stateNames.helper';

export interface CovidData {
    screenshot: string;
    state: string;
    stateShortcut: string;
    totalTests: number;
}

interface GeneralFieldsResponse {
    state: string,
    totalTestResults: number
}

interface ScreenshotsResponse {
  date: string,
  state: string
  url: string
}

const getGeneralFields = async (): Promise<GeneralFieldsResponse[]> => (await fetch('https://covidtracking.com/api/v1/states/current.json')).json();

const getScreenshots = async (): Promise<ScreenshotsResponse[]> => (await fetch('https://covidtracking.com/api/v1/states/screenshots.json')).json();

const getData = async (): Promise<CovidData[]> => {
  const generalFields = await getGeneralFields();
  const screenshot: { [index: string]: {
    date: number;
    url: string;
  }} = {};

  const allScreenshots = await getScreenshots();
  allScreenshots.forEach((item) => {
    if (!screenshot[item.state] || (screenshot[item.state].date < +item.date)) {
      screenshot[item.state] = {
        date: +item.date,
        url: item.url,
      };
    }
  });

  return generalFields.map(({ state, totalTestResults }: GeneralFieldsResponse): CovidData => ({
    screenshot: screenshot[state].url,
    stateShortcut: state,
    state: StateNames[state],
    totalTests: totalTestResults,
  }));
};

export default getData;

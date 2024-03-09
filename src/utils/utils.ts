
export const getActorServerUrl = () => {
    const ENV = process.env.NODE_ENV;
    //TODO: change this url to the actual actor server url
    if (ENV === 'development') return 'https://i_dont_know.com';
    else return 'http://localhost:8080';
}



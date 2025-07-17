import React, { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [postIds, setPostIds] = useState([]);
  const [postMetaData, setPostMetaData] = useState([]);

  async function getData(url){
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } 
    catch (error) {
        console.log(error);
    }
  }

  function getJobTitle(text){
    const arr = text.split(/\((YC [^)]+)\)/);
    if(arr.length > 1){
      const part1 = arr[0];
      const part2 = arr[1];

      return `${part1} ${part2}`
    }
  }

  function getJobInfo(text){
    const arr = text.split(/\((YC [^)]+)\)/);
    if(arr.length > 2){
      return arr[2];
    }
    return 'N/A'
  }

  function getFormattedDate(unixTimesStamp){
    const data = new Date(unixTimesStamp * 1000);
    const month = (data.getMonth()+1).toString().padStart(2, '0');
    const day = data.getDay().toString().padStart(2, '0');
    const year = data.getFullYear()
    const formattedDate = `${month}/${day}/${year}`
    return formattedDate;
  }

  async function fetchMetaData(ids){
    const apiCall = ids.map((id) => {
      const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
      return getData(url)
    })
    let results = await Promise.all(apiCall)
    if(results.length){
      const newArr = results.map((item) => {
        const obj = {
          jobTitle : getJobTitle(item.title),
          jobInfo : getJobInfo(item.title),
          date : getFormattedDate(item.time),
          url : item.url ? item.url : `https://news.ycombinator.com/item?id=${item.id}`
        }
        return obj
      })
      let copyMetaData = [...postMetaData];
      copyMetaData = [...copyMetaData, ...newArr];
      setPostMetaData(copyMetaData);
    }

  }

  async function fetchPostsId(){
    const url = 'https://hacker-news.firebaseio.com/v0/jobstories.json';
    const data = await getData(url);
    const ids = data.splice(0, 9);
    setPostIds(data);
    fetchMetaData(ids)
  }

  useEffect(() => {
    fetchPostsId()
  }, [])

  function handleLoad(){
    const copyIds = [...postIds];
    if(copyIds.length > 0){
      const ids = copyIds.splice(0, 6);
      fetchMetaData(ids)
      setPostIds(copyIds);
    }
  }

  return (
    <div className='App'>
      <h1>Job Board</h1>
      <div className='cards'>
        {
          postMetaData?.length === 0 ? (
            <div> Loading ...</div>
          ) : (
            postMetaData.map((item, index) => {
              return (
                <a key={index} className='card' target='_blank' href={item.url}>
                  <div className="company-info">
                    {item.jobTitle}
                  </div>
                  <div className="hiring-info">
                    {item.jobInfo}
                  </div>
                  <div className="date">
                    {item.date}
                  </div>
                </a>
              )
            })
          )
        }
      </div>
        <button onClick={handleLoad}>Load More</button>
    </div>
  )
}

export default App
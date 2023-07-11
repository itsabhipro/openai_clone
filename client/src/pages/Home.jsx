/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {useState,useEffect} from 'react';
import {Card,Loader,FormField} from "../components";

function RenderCards({data,title}){
    if(data?.length >0) {
      return data.map((post)=><Card key={post._id} {...post}/>)
    }
    return <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>{title}</h2>
}

function Home() {
  const [loading, setloading] = useState(false);
  const [allPost, setallPost] = useState(null);
  const [searchText, setsearchText] = useState('');
  const [searchResult, setsearchResult] = useState(null);
  const [searchTimeout, setsearchTimeout] = useState(null);
  async function getAllPosts(){
    try {
      const response = await fetch("http://localhost:8080/api/v1/post");
      if(response.ok){
        const data = await response.json();
        console.log(data.data);
        setallPost([...data.data.reverse()]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getAllPosts();
  },[]);

  async function handleSearch(e){
    setsearchText(e.target.value);
    clearTimeout(searchTimeout);
    setsearchTimeout(
      setTimeout(()=>{
        const sResult = allPost.filter((item)=>item.name.toLowerCase().includes(searchText.toLowerCase())||item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setsearchResult([...sResult])
      },500)
    );
  }
  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>
          The Community Showcase
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>
          Browse through a collection of imaginative and visually stunning images genrated by DALL-E AI
        </p>
      </div>

      <div className="mt-16">
        <FormField 
          type="text"
          name="search_box"
          value={searchText}
          placeholder="Search posts..."
          handleChange={handleSearch}
        />
      </div>

      <div className="mt-10">
        {
          loading ? (
            <div className='flex justify-center items-center'>
              <Loader/>
            </div>
          ):(
            <div>
              {
                searchText && (
                  <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                    Showing results for <span className='text-[#222328]'>{searchText}</span>
                  </h2>
                )
              }
              <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                {
                  searchText ? (
                    <RenderCards 
                      data={searchResult}
                      title="No search result found"
                    />
                  ):(
                    <RenderCards 
                      data={allPost}
                      title="No posts found"
                    />
                  )
                }
              </div>
            </div>
          )
        }
      </div>
    </section>
  )
}

export default Home
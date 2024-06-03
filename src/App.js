import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PostItem } from './components/post-item/PostItem';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [showPosts, setShowPosts] = useState([]);

  useEffect(() => {
    loadInfos();
  }, []);

  const loadInfos = async() => {
    setIsLoading(true);
    await loadUsers();
    await loadPosts();
    setIsLoading(false);
  }

  const loadUsers = async() => {
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(res.data);
    } catch (e) {

    }
  }

  const loadPosts = async () => {
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setShowPosts(res.data);
    } catch (e) {

    }
  }

  const filterByUser = (val) => {
    if (val != 0) {
      let filteredPosts = posts.filter(item => item.userId == val);
      setShowPosts(filteredPosts);
    } else {
      setShowPosts(posts);
    }
  }

  return (
    <div className="App">
      <div className="App-container">
        {isLoading && <img src="/loading.gif" className="loading-gif" />}
        {
          !isLoading && (
            <div>
              {
                users.length && (
                  <div className='filter-box'>
                    <div>
                      Posted By: 
                      <select onChange={e => {filterByUser(e.target.value)}}>
                        <option value="0">All</option>
                        {users.map((user, index) => (
                          <option key={index} value={user.id}>{user.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      Posts: {showPosts.length} &nbsp;&nbsp;&nbsp;&nbsp; Users: {users.length}
                    </div>
                  </div>
                )
              }
              {showPosts.length && showPosts.map((item, index) => (
                <PostItem postItem={item} users={users} key={index} />
              ))}
              {showPosts.length == 0 && <div>No Posts</div>}
            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;

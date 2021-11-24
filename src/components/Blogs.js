import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInput, setBlogData } from "../features/userSlice";

import "../styling/blogs.css";

const Blogs = () => {
  const searchInput = useSelector(selectUserInput);
  const dispatch = useDispatch();

  const base__url = `https://gnews.io/api/v4/search?q=${searchInput}&token=8cacee3e3dcf01ea7bcd5c3956fc37d5`;

  const [blogs, setBlogs] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(base__url)
      .then((response) => {
        dispatch(setBlogData(response.data));
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchInput]);

  console.log(blogs);

  return (
    <div className="blog-page">
      <h1 className="blog-page-header">Blogs</h1>
      {loading ? <h1 className="loding">Loading...</h1> : ""}
      <div className="blogs">
        {blogs?.articles?.map((blog) => {
          console.log(blog);

          return (
            <a
              className="blog"
              target="_blank"
              href={blog.url}
              rel="noreferrer"
            >
              <img src={blog.image} alt="" />
              <div>
                <h3 className="sourceName">
                  <span>{blog.source.name}</span>
                  <span>{blog.publishedAt}</span>
                </h3>
                <h1>{blog.title}</h1>
                <p>{blog.description}</p>
              </div>
            </a>
          );
        })}

        {blogs?.totalArticles === 0 && (
          <h1 className="no-blogs">
            No Blogs Available. Search for something else..
          </h1>
        )}
      </div>
    </div>
  );
};

export default Blogs;

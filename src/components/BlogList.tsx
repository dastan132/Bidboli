import React from 'react'

import { BLOG_LOADER_ARRAY } from '../constants/loaderArray'

import { useGetLatestBlogsQuery } from '../features/api/homeApiSlice'

export default function BlogList() {
  const { data, isLoading } = useGetLatestBlogsQuery()

  return (
    <section>
      <div className="mx-5">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-6 col-xl-9 text-center text-md-start text-xl-start py-3 py-xl-0">
            <h2 className="fw-bold m-0">Latest Blogs</h2>
          </div>
          <div className="col-12 col-md-6 col-lg-6 col-xl-3 text-center text-xl-end text-md-end pb-3 py-xl-0">
            <button className="btn btn-primary btn-sm btn-viewall">View All</button>
          </div>
        </div>
        <div className="row justify-content-center">
          {isLoading &&
            BLOG_LOADER_ARRAY.map((loader) => (
              <div key={loader} className="mx-2 mt-3 blog-loader loading">
                <div className="image"></div>
                <div className="content">
                  <h4 className="title"></h4>
                  <div className="description"></div>
                </div>
              </div>
            ))}
          <div className="blog-wrapper">
            {data?.map((blog: any) => (
              <div key={blog.id} className="blog-card">
                <div className="border">
                  <div className="blog-thumb">
                    <a href="/">
                      <img src={blog.featuredImage} />
                    </a>
                  </div>
                  <div className="px-2 pt-2">
                    <h5 className="fw-bold">
                      <a href="/" className="text-dark text-lg">
                        {blog.title}
                      </a>
                    </h5>
                    <p className="text-secondary sm_tex py-1">
                      {new Intl.DateTimeFormat('en-In').format(new Date(blog.publishDate))}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

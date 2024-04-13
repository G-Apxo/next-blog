"use client";
import React, { useCallback } from "react";
import { useState, useEffect, useRef } from "react";
const InfiniteScroll = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const lastItem = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  useEffect(() => {
    const loadItems = async () => {
      if (!loading && hasMore) {
        setLoading(true);
        const response = await fetch(
          `https://fakestoreapi.com/products?limit=${1}`
        );
        const newData = await response.json();
        setData((prevItems) => [...prevItems, ...newData]);
        setLoading(false);
      }
    };
    loadItems();
  }, [page, hasMore]);
  return (
    <div>
      <h1>Infinite Scroll</h1>
      <div className="flex flex-col justify-center items-center">
        {data.map((item, index) => (
          <div key={index} className="w-1/4 mb-10 p-10 border-8" ref={lastItem}>
            <h3 className="text-black"> {item.title}</h3>
            <p className="text-black">{item.description}</p>
          </div>
        ))}
        <button
          onClick={() => {
            setPage(page + 5);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
};

export default InfiniteScroll;

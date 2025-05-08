import { useEffect, useState } from "react";

const API_URL = "https://two025-5-project.onrender.com/main";

export default function Home() {
  const [data, setData] = useState([]);

  // 讀取資料
  const fetchData = async () => {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      if (Array.isArray(json.data)) {
        setData(json.data);
      } else {
        console.error("回傳資料格式錯誤", json);
        setData([]);
      }
    } catch (err) {
      console.error("無法取得資料", err);
      setData([]);
    }
  };

  // 刪除資料
  const handleDelete = async (id) => {
    try {
      const res = await fetch(API_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });
      if (res.ok) {
        fetchData();
      } else {
        const error = await res.json();
        console.error("刪除失敗", error);
      }
    } catch (err) {
      console.error("刪除時發生錯誤", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">客戶名單</h1>
      <ul className="space-y-2 max-w-2xl mx-auto">
        {data.map((item) => (
          <li
            key={item._id}
            className="bg-white p-4 rounded shadow flex flex-col sm:flex-row justify-between items-start sm:items-center"
          >
            <div>
              <p><strong>聯絡人：</strong>{item["Contact Person"]}</p>
              <p><strong>Email：</strong>{item.Email}</p>
              <p><strong>電話：</strong>{item.Phone}</p>
              <p><strong>地址：</strong>{item.Address}</p>
            </div>
            <button
              onClick={() => handleDelete(item._id)}
              className="mt-4 sm:mt-0 sm:ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              刪除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

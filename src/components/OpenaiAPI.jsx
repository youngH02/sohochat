// import axios from "axios";
// import useAsync from "./useAsync";

// async function api(question) {
//   // const response = await axios.post(
//   //   "http://localhost:3002/get-chatgpt-result-stream",
//   //   {
//   //     prompt: `${question}`,
//   //     model: "chatgpt",
//   //     uniqueid: "id-1701320901058-0.1831593819aa5",
//   //   }
//   // );

//   const response = await axios.get(
//     `https://jsonplaceholder.typicode.com/users/${question}`
//   );
//   return Response.data;
// }

// function openaiAPI({ question }) {
//   const [state] = useAsync(() => api(question), [question]);

//   const { loading, data, error } = state;
//   if (loading) return <div>데이터 생성중ㅁㄴㅇㄹㅁㄴㄹㅇㅁㄴ</div>;
//   if (error) return "ERRRR";
//   if (!data) return <div>데이터 생성중</div>;
// }

// export default openaiAPI;

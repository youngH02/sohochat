function readAllChunks(readableStream) {
  const reader = readableStream.getReader();
  const chunks = [];
 
  function pump() {
    return reader.read().then(({ value, done }) => {
      if (done) {
        return chunks;
      }
      chunks.push(value);
      return pump();
    });
  }
 
  return pump();
}

async function streamTest1(){

    fetch(`https://jsonplaceholder.typicode.com/users/2`)
  // Retrieve its body as ReadableStream
  .then((response) => response.body)
  .then((body) => {
    const reader = body.getReader();
  
    return new ReadableStream({
      
      start(controller) {
        console.log("readstart")
        return pump();

        function pump() {
          return reader.read().then(({ done, value }) => {
            // When no more data needs to be consumed, close the stream
            if (done) {
              controller.close();
              return;
            }

            // Enqueue the next data chunk into our target stream
            controller.enqueue(value);
            return pump();
          });
        }
      },
    });
  })
  .then((stream) => new Response(stream))
  .then((response) => response.blob())
  .then((blob) => URL.createObjectURL(blob))
  // .then((url) => console.log((image.src = url)))
  .catch((err) => console.error(err));


}

const streamTest = (e) =>{

const stream = new ReadableStream({
  start(controller) {
    console.log("start");
    let num = 0;

    const interval = setInterval(() => {
      controller.enqueue(num++);
      if (num === 10) {
        controller.close();
        clearInterval(interval);
      }
    }, 1_000);
  },
});

  const reader = stream.getReader();
reader.read().then(function print({ done, value }) {
  if (done) return console.log("done");
  console.log({ value });
  reader.read().then(print);
});
}

export default streamTest1;
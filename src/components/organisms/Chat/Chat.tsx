const Chat = () => {
  return (
    <div
      className="w-full py-24 stretch"
      style={{ overflowY: 'scroll', height: '100vh' }}
    >
      <div className="flex flex-col mx-auto max-w-3xl ">
        <div id="chart-goes-here"></div>

        <form className="flex justify-center">
          <input
            className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
            placeholder="新宿のまちづくりのデータを教えて"
          />
        </form>
      </div>
    </div>
  );
};

export default Chat;

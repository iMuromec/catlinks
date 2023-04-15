const DeleteConfirm = ({ handleDelete, setShowDeleteConfirm }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 bg-black bg-opacity-50 z-10 px-2">
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-5 rounded-lg">
          <h2 className="text-lg font-bold mb-5 text-center">
            Вы уверены, что хотите удалить ссылку?
          </h2>
          <div className="flex justify-end">
            <button
              name="Удалить"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-5"
              onClick={handleDelete}
            >
              Удалить
            </button>
            <button
              name="Отменить"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowDeleteConfirm(false)}
            >
              Отменить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirm;

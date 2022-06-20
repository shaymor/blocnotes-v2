import { useRouter } from 'next/router';
import * as React from 'react';

export default function Form({ setOpen }) {
  const { classId } = useRouter().query;
  const handleSubmit = async (event) => {
    setOpen(false);
    event.preventDefault();

    const data = JSON.stringify({
      post_name: event.target.post_name.value,
      post_link: event.target.post_link.value,
      class_id: parseInt(classId, 10),
    });

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    };

    await fetch('/api/form', options);
  };

  return (
    <div className="mx-10">
      <form onSubmit={handleSubmit}>
        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="post_name"
            >
              Post name
              <input
                type="text"
                id="post_name"
                name="post_name"
                className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </label>
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="post_link"
            >
              Post link
              <input
                type="text"
                id="post_link"
                name="post_link"
                className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </label>
          </div>
        </div>
        <div className="px-4 py-3 mb-6 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="submit"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-100 text-base font-medium text-gray-900 hover:bg-primary-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Upload
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

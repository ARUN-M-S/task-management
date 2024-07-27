import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import { CardItemProps } from 'app/types/myTypes';




const CardItem: React.FC<CardItemProps> = ({ data, onEdit, onDelete }) => {
  return (
    <Draggable index={data?.id} draggableId={data?.id.toString()}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='bg-white rounded-md p-3 mt-3 shadow-sm'
        >
          <div className='flex items-center justify-between'>
            <label
              className={`px-2 py-1 rounded text-sm text-white ${data?.priority == '0'
                  ? 'bg-gradient-to-r from-green-500 to-green-200'
                  : data?.priority == '1'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-200'
                    : 'bg-gradient-to-r from-red-500 to-red-200'
                }`}
            >
              {data?.priority == '0'
                ? 'Low Priority'
                : data?.priority == '1'
                  ? 'Medium Priority'
                  : 'High Priority'}
            </label>

            {/* Dropdown Menu for Edit and Delete */}
            <Menu as="div" className="relative">
              <Menu.Button className="text-gray-500 hover:text-gray-700">
                <DotsVerticalIcon className="w-5 h-5" />
              </Menu.Button>
              <Transition
                as={React.Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="p-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => onEdit(data)}
                          className={`group flex rounded-md items-center w-full px-2 py-2 text-sm ${active ? 'bg-indigo-600 text-white' : 'text-gray-900'}`}
                        >
                          Edit
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => onDelete(data.id)}
                          className={`group flex rounded-md items-center w-full px-2 py-2 text-sm ${active ? 'bg-red-600 text-white' : 'text-gray-900'}`}
                        >
                          Delete
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <h5 className='text-md my-3 text-lg leading-6'>{data?.title}</h5>
          <div className='text-sm text-gray-600'>{data?.description}</div>
        </div>
      )}
    </Draggable>
  );
};

export default CardItem;

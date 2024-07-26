import React from 'react';
import { Draggable } from '@hello-pangea/dnd';

const CardItem = ({ data }:any) => {
  console.log(data,"data");
  
  return (
    <Draggable index={data?.id} draggableId={data?.id.toString()}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
           className='bg-white rounded-md p-3 mt-3'
        >
          <label
            className={`px-2 py-1 rounded text-sm text-white ${
              data?.priority === 0
                ? 'bg-gradient-to-r from-green-500 to-green-200'
                : data?.priority === 1
                ? 'bg-gradient-to-r from-blue-500 to-blue-200'
                : 'bg-gradient-to-r from-red-500 to-red-200'
            }`}
          >
            {data?.priority === 0
              ? 'Low Priority'
              : data?.priority === 1
              ? 'Medium Priority'
              : 'High Priority'}
          </label>
          <h5 className='text-md my-3 text-lg leading-6'>Company website redesign</h5>
          <div className='flex justify-between'>
            <div>here is nothing</div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default CardItem;

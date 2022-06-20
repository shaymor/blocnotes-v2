import Link from 'next/link';
import * as React from 'react';

function Card({ classDetails }) {
  return (
    <Link href={`/class/${classDetails.class_id}`} passHref>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className="block p-6 m-2 max-w-sm rounded-lg border shadow-md bg-dark border-zinc-700 hover:bg-zinc-700">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          {classDetails.class_name}
        </h1>
        <p className="uppercase font-bold opacity-50 text-xs text-white mb-2">
          Period {classDetails.class_period}
        </p>
        <p className="text-sm text-white opacity-50 pb-2">
          Click on this box to access the notes for the class listed above.
        </p>
        <div className="flex flex-row">
          {['M', 'T', 'W', 'R', 'F'].map((day) => {
            if (classDetails.class_days.includes(day)) {
              return (
                <div
                  key={day}
                  className="w-4 h-4 p-3 mr-2 bg-zinc-700 rounded-full flex items-center justify-center"
                >
                  <p className="text-xs text-white">{day}</p>
                </div>
              );
            }
            return (
              <div
                key={day}
                className="w-4 h-4 p-3 mr-2 bg-zinc-700 rounded-full flex items-center justify-center"
              >
                <p className="text-xs text-gray-500">{day}</p>
              </div>
            );
          })}
        </div>
      </a>
    </Link>
  );
}

export default function Schedule({ schedule }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="pt-12">Your Schedule</h1>
      <div className="mx-auto flex flex-wrap items-center justify-around py-12 max-w-screen-xl">
        {schedule.map((classDetails) => (
          <Card key={classDetails.class_id} classDetails={classDetails} />
        ))}
      </div>
    </div>
  );
}

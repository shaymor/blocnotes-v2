import { Dialog, Transition } from '@headlessui/react';
import * as React from 'react';

export default function Roster({ open, setOpen, students }) {
  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={React.Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-4 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-2xl font-bold text-gray-900">
                        Roster
                      </Dialog.Title>
                    </div>
                    <div className="relative mt-4 flex flex-col divide-y-2 border-t-2">
                      {students.map((student) => {
                        if (student.student_email !== null) {
                          return (
                            <a
                              className="flex flex-col py-3 px-4 sm:px-6 hover:bg-primary-100"
                              href={`mailto:${student.student_email}`}
                              key={student.student_id}
                            >
                              <h1 className="text-base font-medium">
                                {student.student_name}
                              </h1>
                              <span className="text-xs pt-[2px] font-medium text-gray-900 opacity-50 uppercase">
                                {student.student_email}
                              </span>
                            </a>
                          );
                        }
                        return (
                          <div
                            className="flex flex-col py-3 px-4 sm:px-6 hover:bg-primary-100"
                            key={student.student_id}
                          >
                            <h1 className="text-base font-medium">
                              {student.student_name}
                            </h1>
                            <span className="text-xs pt-[2px] font-medium text-gray-900 opacity-50 uppercase">
                              Email unavailable
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

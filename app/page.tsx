'use client';

import Column from '@/components/molecules/Column';

export default function Home() {
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-light-gray">
      <Column
        status={{
          id: '123',
          name: 'TODO',
          color: '#49C4E5',
        }}
      />
    </main>
  );
}

"use client"

import Header from "@/components/atoms/Header";
import Text from "@/components/atoms/Text";
import Button from "@/components/atoms/Button";
import CheckboxWithText from "@/components/atoms/CheckboxWithText";
import TextInput from "@/components/atoms/TextInput";
import Dropdown from "@/components/atoms/Dropdown";
import { Task } from "@/lib/models/Task";
import Card from "@/components/atoms/Card";

export default function Home() {
  const task: Task = {
    id: "123",
    title: "Build UI for onboard flow",
    statusId: "123",
    description: "Not just another task",
    subtasks: [
      {
        id: "124",
        title: "A subtask",
        isCompleted: true
      },
      {
        id: "125",
        title: "Another subtask",
        isCompleted: false
      }
    ]
  }

  return (
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-light-gray">
        <div>
          <Header variant="xl">Extra Large Header</Header>
          <Header variant="lg">Large Header</Header>
          <Header variant="md">Medium Header</Header>
          <Header variant="sm">Small Header</Header>
          <Text variant="regular">Regular Text</Text>
          <Text variant="bold">Bold Text!</Text>
          <Button color="primary" size="large">Primary Large</Button>
          <Button>Primary Small</Button>
          <Button color="secondary">Secondary</Button>
          <Button color="destructive">Destructive</Button>
          <CheckboxWithText label="Checkbox" />
          <TextInput placeholder="Enter task name" />
          <div className="ml-[20px]">
            <Dropdown
              options={[
                { value: 'Todo', label: 'Todo' },
                { value: 'Doing', label: 'Doing' },
                { value: 'Done', label: 'Done' },
              ]}
              placeholder="Todo"
              onValueChange={(value: string) => {
                console.log('Selected value:', value);
              }}
            />
          </div>
          <Card task={task} />
        </div>
      </main>
  );
}

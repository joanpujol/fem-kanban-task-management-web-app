"use client"

import Header from "@/components/atoms/Header";
import Text from "@/components/atoms/Text";
import Button from "@/components/atoms/Button";
import CheckboxWithText from "@/components/atoms/CheckboxWithText";
import TextInput from "@/components/atoms/TextInput";
import Dropdown from "@/components/atoms/Dropdown";

export default function Home() {
  return (
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
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
        </div>
      </main>
  );
}

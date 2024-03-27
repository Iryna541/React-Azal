import { Box, Button, Select, Text, TextInput } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useState } from "react";



interface Option {
  value: string;
  label: string;
}

interface SendScreenshotModalProps {
  addPhoto: (photo: { photo: string }) => void;
  setSubmit: (submit: boolean) => void;
  setStoreId: (storeId: string) => void;
  setEmailText: (emailText: string) => void;
}

export default function SendScreenshotModal({ addPhoto, setSubmit, setStoreId,setEmailText }: SendScreenshotModalProps) {

  const [option, setOption] = useState("");
  const [emailText, setEmailTextState] = useState("");



  const options: Option[] = [
    { value: 'BK#4', label: 'BK#4' },
    { value: 'BK#42', label: 'BK#42' },
    { value: 'BK#78', label: 'BK#78' },
    { value: 'BK#77', label: 'BK#77' },
  ];

  const handleChange = (value: string | null) => {
    if (value === null) {
      setOption("");
    } else {
      setOption(value);
    }
  };
    const handleTakeScreenshot = () => {
    addPhoto({ photo: "" });
    setEmailText(emailText);
    setStoreId(option);
    setSubmit(true);
    modals.closeAll();
  };


  return <>
  <Box>
  <Select
      placeholder="Pick value"
      data={options}
      value={option}
      onChange={handleChange}
      defaultValue="React"
      mb="md"
      label="Pick a store"
  />
  <TextInput
        label="Email Text"
        placeholder="Enter your message"
        value={emailText}
        onChange={(event) => setEmailTextState(event.currentTarget.value)}
        mb="md"
      />
    <Button onClick={handleTakeScreenshot}>Send reports by email</Button>
  </Box>
  </>
}

export function openSendScreenshotModal({addPhoto,setSubmit,setStoreId,setEmailText}:SendScreenshotModalProps) {
  modals.open({
    size: "xl",
    title: (
        <Text>Send by email</Text>
    ),
    centered: true,
    children: <SendScreenshotModal addPhoto={addPhoto} setSubmit={setSubmit} setStoreId={setStoreId} setEmailText={setEmailText} />,
  });
} 
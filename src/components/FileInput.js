import React from "react";
import { Select, Stack } from "@chakra-ui/react";

const FileInput = () => {
  return (
    <div className="file-input-container">
      <form>
        <Stack spacing={3}>
          <h3>Upload Document</h3>
          <Select defaultValue={"option1"}>
            <option value="option1">pdf</option>
            <option value="option2">docx</option>
            <option value="option3">txt</option>
          </Select>
          <input type="file" />
          <input type="submit"></input>
        </Stack>
      </form>
    </div>
  );
};

export default FileInput;

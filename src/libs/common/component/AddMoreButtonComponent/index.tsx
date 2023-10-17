import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export function AddMoreButtonComponent({
  append,
  defaultValue,
  copyNumber = 1,
}: Record<any, any>) {
  const doAppend = () => {
    const rows = [];
    for (let i = 0; i < copyNumber; i++) {
      rows.push(defaultValue);
    }
    append(rows);
  };

  return (
    <Box>
      <Button variant="contained" onClick={() => doAppend()} color="inherit">
        Add More
      </Button>
    </Box>
  );
}

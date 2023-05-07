import * as React from "react";
import Link from "next/link";
import Chip from "@mui/material/Chip";

export default function ChipTag({ label = "",href="/", children }) {
  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  return (
    <div className="pr-3">
      <Link href={href} passHref>
        {children ? (
          <Chip
            icon={children}
            label={label}
            sx={{ pl: 0.7, pr: 0.4, py: 0.2, fontSize: 15 }}
          />
        ) : (
          <Chip
            label={label}
            sx={{ px: 0.4, py: 0.2, fontSize: 15 }}
          />
        )}
      </Link>
    </div>
  );
}

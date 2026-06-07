"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface TabsProps {
  tabTitles: string[];
  tabContents: React.ReactNode[];
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export default function TabsComponent2({ tabTitles, tabContents }: TabsProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        borderRadius: "12px",
        border: "1px solid var(--border-primary)",
        overflow: "hidden",
        backgroundColor: "var(--bg-card)",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "var(--border-primary)" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="tabs"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            backgroundColor: "var(--bg-card)",
            "& .MuiTab-root": {
              color: "var(--text-tertiary)",
              fontWeight: 600,
              fontSize: "0.875rem",
              textTransform: "none",
              "&.Mui-selected": {
                color: "var(--accent-blue)",
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "var(--accent-blue)",
            },
          }}
        >
          {tabTitles.map((title, index) => (
            <Tab key={title} label={title} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
      <Box className="w-full overflow-x-auto">
        {tabContents.map((content, index) => (
          <CustomTabPanel key={index} value={value} index={index}>
            {content}
          </CustomTabPanel>
        ))}
      </Box>
    </Box>
  );
}

'use client';

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

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
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function TabsComponent2({ tabTitles, tabContents }: TabsProps) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ borderRadius: '15px', border: '1px solid #E0E0E0' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    className="bg-white rounded-t-[15px] "
                    value={value}
                    onChange={handleChange}
                    aria-label="tabs"
                    variant="scrollable" // This is applied to Tabs, not Tab
                    scrollButtons="auto" // This is applied to Tabs
                    allowScrollButtonsMobile // Also applied to Tabs
                >
                    {tabTitles.map((title, index) => (
                        <Tab
                            key={title}
                            className="  text-[#333333] font-semibold "
                            label={title}
                            {...a11yProps(index)}
                        />
                    ))}
                </Tabs>
            </Box>
            <Box className="w-full overflow-x-auto  tab-scrollbar">
                {tabContents.map((content, index) => (
                    <CustomTabPanel key={index} value={value} index={index} >
                        {content}
                    </CustomTabPanel>
                ))}
            </Box>
        </Box>
    );
}

import {
  Box,
  Grid,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";
import { marked } from "marked";
import { InsightsList } from "../components/InsightsList";
import { BarChart } from "@mantine/charts";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function SubwayInsights() {
  return (
    <InsightsList
      data={data}
      control={({ row }) => {
        return (
          <Grid>
            <Grid.Col span={4}>
              <Title order={6} fw={500}>
                Rank
              </Title>
              <Text>#{row.overall_ranking}</Text>
            </Grid.Col>
            <Grid.Col span={4}>
              <Title order={6} fw={500}>
                Store Id
              </Title>
              <Text>{row.store_id}</Text>
            </Grid.Col>
            <Grid.Col span={4}>
              <Title order={6} fw={500}>
                Total Sales
              </Title>
              <Text>{formatter.format(row.total_sales)}</Text>
            </Grid.Col>
          </Grid>
        );
      }}
      panel={({ row }) => {
        const html = marked(row.insight) as string;
        const summaryHtml = marked(row.summary) as string;
        const headingHtml = marked(row.heading) as string;
        return (
          <Stack style={{ borderTop: "1px solid hsl(var(--border))" }} py="md">
            <Box>
              <TypographyStylesProvider p="0" m="0">
                <div
                  style={{ fontSize: 14 }}
                  dangerouslySetInnerHTML={{ __html: headingHtml! }}
                />
              </TypographyStylesProvider>
            </Box>
            <SimpleGrid cols={2} spacing="xl">
              <Paper
                withBorder
                p="md"
                style={{ display: "flex", alignItems: "center" }}
              >
                <TypographyStylesProvider p="0" m="0">
                  <div
                    style={{ fontSize: 14 }}
                    dangerouslySetInnerHTML={{ __html: summaryHtml! }}
                  />
                </TypographyStylesProvider>
              </Paper>
              <Paper withBorder p="md">
                <Title order={4} fw={500} mb="md">
                  Daily Sales Chart
                </Title>
                <BarChart
                  h={200}
                  data={row.charts[0].data}
                  dataKey="label"
                  series={[{ name: "sales", color: "green.6" }]}
                  tickLine="y"
                  barProps={{
                    barSize: 36,
                  }}
                  barChartProps={{
                    margin: {
                      top: 12,
                      left: 0,
                      right: 0,
                      bottom: 0,
                    },
                  }}
                />
              </Paper>
            </SimpleGrid>
            <TypographyStylesProvider p="0" m="0">
              <div
                style={{ fontSize: 14 }}
                dangerouslySetInnerHTML={{ __html: html! }}
              />
            </TypographyStylesProvider>
          </Stack>
        );
      }}
    />
  );
}

const data = [
  {
    store_id: 17830,
    total_sales: 11505.07,
    store_name: "Prince Frederick",
    overall_ranking: 1,
    heading: "## Subway Prince Frederick (17830) - May 8th - May 14th",
    summary:
      "### Summary  \n- Fluctuating sales with peaks during mid-days, efficient labour management with zero overtime.\n- Success of footlong promos, dominance of eat-in orders, cash payment preference.\n- Potential improvement in take-out and delivery sales, tailored promotions needed.",
    insight:
      '\n#### Sales Analysis\n- **Total Sales**: \n  - **Weekly Sales Total**: $11,504.07\n  - Sales varied, peaking on May 13th at $1,786.42 and bottoming on May 12th with $1,133.90.\n- **Order Breakdown**:\n  - **Eat-In Sales**: Dominated the sales mix with **$8,514.12** total, indicating strong dine-in preference.\n  - **Take-Out Sales**: Accumulated to **$2,097.59** for the week.\n  - **Delivery Sales**: Registered at **$1,092.65**.\n\n#### Item and Unit Analysis\n- **Footlong Sandwiches** continue to dominate sales, making up approximately **64% of total units sold** throughout the week. On a peak day, Footlongs constituted 70.2% of units sold (May 12th).\n- **6 Inch, Salad, Wraps** account for **approximately 34%** of the total unit sales.\n- **High-performing Items**:\n  - The **Turkey Footlong**, **Ultimate B.M.T. Footlong**, and **Cold Cut Combo Footlong** were the best sellers across the week.\n\n#### Discounts and Promotions\n- **Top Discounts Utilized**:\n  - **MOB - BOGO Any Footlong Sub/Signature Wrap** was the most availed discount this week.\n- **Discount Impact**: Discounts contributed to attracting more customers, especially during peak hours.\n\n#### Payment Insights\n- **Cash Payments** dominated, contributing **about 70% of all sales transactions** overall.\n- **Third Party PrePaid** transactions were significant for delivery orders, with **18.2% sales contribution** on the highest day (May 10th).\n\n#### Labor Analysis\n- **Total Hours Worked**: 344.97 hours\n- **Overtime Hours**: No overtime recorded, a signal of efficient workforce management.\n- **Top Contributors**:\n  - **Amanda Nixon** worked the most hours (32.35 hours).\n  - Other significant contributors include **Jacob Brendlinger** (33.85 hours) and **Jill Stone** (28.10 hours).\n\n### Insights\n\n1. **Operational Efficiency**:\n   - Efficient attendance and proper shift management resulted in zero overtime, keeping labor costs optimized.\n   - High labor engagement during peak hours ensured seamless customer service and transaction handling.\n\n2. **Promotions and Discounts**:\n   - Promo on Footlongs (BOGO offers) positively influenced unit sales, suggesting a potential strategy to maintain or increase foot traffic.\n   \n3. **Customer Preferences**:\n   - Strong inclination towards Eat-In services suggests opportunities for in-store promotions and campaigns targeted at dine-in customers.\n\n### Opportunities\n- **Leverage Peak Time Offers**: Since the peak hours notably concentrate around lunch and late-afternoon, introducing lunch specials or exclusive meal deals during these hours can boost sales.\n- **Tailored Promotions**: Implementing more targeted discounts similar to "BOGO Any Footlong" can drive higher sales volumes without excessively cutting into margins.\n- **Delivery Engagement**: Enhancing third-party delivery service partnerships can unlock additional revenue streams considering their current positive impact.\n\nOverall, Prince Frederick store #17830 has shown stable performance with specific peaks in sales and high efficiency in labor management. Aligning future strategies around the identified trends and consumer behaviors can further optimize performance.',
    charts: [
      {
        name: "Daily sales chart",
        id: "daily_sales_chart",
        data: [
          { sales: 1896.71, date: "2024-05-08", label: "Wed" },
          { sales: 1669.05, date: "2024-05-09", label: "Thu" },
          { sales: 1615.18, date: "2024-05-10", label: "Fri" },
          { sales: 1667.49, date: "2024-05-11", label: "Sat" },
          { sales: 1133.9, date: "2024-05-12", label: "Sun" },
          { sales: 1786.42, date: "2024-05-13", label: "Mon" },
          { sales: 1736.32, date: "2024-05-14", label: "Tue" },
        ],
      },
    ],
  },
  {
    store_id: 18315,
    total_sales: 9360.35,
    store_name: "Charlotte Hall",
    overall_ranking: 2,
    heading: "## Subway Charlotte Hall (18315) - May 8th - May 14th",
    summary:
      "### Summary  \n- The peak hours for sales are between 1pm-4pm, indicating higher customer footfall during this time.\n- Customers show a preference for Footlongs and buy-one-get-one promotions indicating value-driven purchases.\n- Cash transactions dominate, accounting for approximately 83.83% of all payments.",
    insight:
      "\n### Sales Numbers:\n- **Total Sales**: $9,359.35\n- **Daily Breakdown**:\n  - **Highest Sales Day**: May 8th, 2024 ($1,679.50)\n  - **Lowest Sales Day**: May 12th, 2024 ($874.68)\n\n### Peak Sales Hours:\n1. **May 8th, 2024** - 9:00 PM: $215.64\n2. **May 13th, 2024** - 2:00 PM: $204.99\n3. **May 12th, 2024** - 9:00 PM: $112.43\n\n**Note**: Consistently high sales during 2:00 PM - 4:00 PM time periods.\n\n### Average Metrics:\n- **Average Transaction Value**: Ranged from \\$10.95 to \\$13.04, with an average of \\$11.74.\n- **Units per Customer**: Averaged approximately 1.36 to 1.51 units/customer.\n- **Diff vs. Last Week (LW)**: Varied, showing both increases and decreases, pointing towards a non-uniform sales trend.\n\n### Promotions and Discounts:\n- **Highest Utilized Discount**: MOB - BOGO Any Footlong Sub/Signature Wrap, indicating a preference for buy-one-get-one promotions.\n  - Example Utilization Peak: 16 instances on May 9th, 2024.\n\n### Customer Payment Preferences:\n- **Cash transactions** accounted for an average of 83.83% of all payments.\n- **VISA** and **MasterCard** combined made up approximately 13.2%.\n\n### Labor:\n- **Total Labor Hours**: 301.12 hours.\n- **Highest Working Hours**:\n  1. **Brian Parrish**: 36.85 hours\n  2. **David Payne**: 35.88 hours\n  3. **Bradley Brown**: 34.18 hours\n\n- **Labor Cost Considerations**: No overtime registered, indicating efficient labor management.\n\n### Insights:\n\n1. **Peak Hours are between 1:00 PM - 4:00 PM**:\n   - The repetitive high sales figures during this period suggest this is when customer footfall is the highest.\n   - **Opportunity**: Introduce lunch specials or bundles to capitalize on this time slot.\n\n2. **Promo Efficiency**:\n   - High utilization of buy-one-get-one promotions could be further leveraged to increase foot traffic.\n   - **Opportunity**: Launch targeted promotions extending these offers to specific days of the week to boost sales on historically low-performing days.\n\n3. **Customer Preferences**:\n   - The dominance of **Footlongs** in sales suggests customers prefer value/quantity combinations.\n   - **Opportunity**: Promote new footlong variants or combo deals to align with customer preferences.\n\n4. **Delivery Channels**:\n   - **DoorDash** is the sole third-party delivery provider consistently yielding sales.\n   - **Opportunity**: Expand partnerships with other delivery platforms (GrubHub, UberEats) to diversify and increase delivery sales channels.\n\n5. **Labor Optimization**:\n   - Efficient labor use with no overtime suggests room for expansion in working hours for employees like **Alaya Scott** and **Jasmine Lubic** who worked fewer hours.\n   - **Opportunity**: Reallocate hours, especially during peak sales hours, to enhance service efficiency.\n\n**Overall Summary**: Charlotte Hall store's performance was stable with peak sales during lunchtime hours and a strong inclination towards footlong sandwiches. Leveraging targeted promotions, diversifying delivery channels, and optimizing labor hours are key opportunities for boosting future sales and operational efficiency.\n",
    charts: [
      {
        name: "Daily sales chart",
        id: "daily_sales_chart",
        data: [
          { sales: 1679.5, date: "2024-05-08", label: "Wed" },
          { sales: 1541.68, date: "2024-05-09", label: "Thu" },
          { sales: 1464.86, date: "2024-05-10", label: "Fri" },
          { sales: 1395.5, date: "2024-05-11", label: "Sat" },
          { sales: 874.68, date: "2024-05-12", label: "Sun" },
          { sales: 1204.82, date: "2024-05-13", label: "Mon" },
          { sales: 1199.31, date: "2024-05-14", label: "Tue" },
        ],
      },
    ],
  },
  {
    store_id: 21331,
    total_sales: 7816.3,
    store_name: "Waldorf",
    overall_ranking: 3,
    heading: "## Subway Waldorf (21331) - May 8th - May 14th",
    summary:
      "### Summary  \n- Peak sales occurred in early afternoon with Footlong sandwiches being a significant contributor.\n- Third-party platforms, especially DoorDash, play a crucial role in overall sales.\n- Efficient labor management results in no overtime, demonstrating effective cost containment.",
    insight:
      "\n#### Sales Numbers:\n- **Total Sales for the Week:** $7,816.31\n- **Peak Sales Hours:** \n  - 1:00 PM to 2:00 PM: $1,281.44\n  - 12:00 PM to 1:00 PM: $968.02\n  - 2:00 PM to 3:00 PM: $857.27\n- **Before 10:00 AM Sales:** $212.27\n- **Before 11:00 AM Sales:** $539.00\n- **3PL Sales Distribution:**\n  - DoorDash: $548.55\n  - Uber Eats: $148.01\n  - Grubhub: $88.71\n\n#### Footlong vs 6-Inch:\n- **Sales Contribution:** Footlong sandwiches accounted for 63.5% of total units sold, amounting to approximately $4,965.73 in sales.\n- **Top Selling Footlongs:** Tuna Footlong, Turkey Footlong, and Ultimate B.M.T. Footlong led the sales.\n- **Conclusion:** There is a clear preference for Footlong sandwiches which substantiates running promotions or discounts on these items to further boost sales.\n\n#### Insights from Orders and Tenders:\n- **Top Discounts Utilized:** The top discounts utilized were MOB offers which involved buy-one-get-one deals on footlongs and 6-inch subs. \n- **Cashless Tenders:** A significant portion of customers (60.36%) preferred using credit cards (VISA, MasterCard, Amex).\n\n#### Labor:\n- **Total Labor Hours:** 359.43 hours\n- **Top Employees Based on Hours Worked:**\n  - Peggy Buttler: 43.52 hours\n  - Lorraine Weatherspoon: 41.48 hours\n  - Cindy Burch: 33.63 hours\n- **Potential Overtime Issues:** No overtime hours were recorded for the week, demonstrating efficient labor allocation.\n- **Actionable Insight:** Proper allocation and management of work hours ensured no employee worked overtime, thereby keeping labor costs under control.\n\n### Summary:\nThis week, Subway Waldorf demonstrated effective management of labor and cash flow with significant peaks in the early afternoon. Key takeaways include focusing on footlong promotions and handling peak hour transactions efficiently. Utilizing time-based analytics can enhance staffing and promotional strategies, leading to increased customer satisfaction and profitability.",
    charts: [
      {
        name: "Daily sales chart",
        id: "daily_sales_chart",
        data: [
          { sales: 1244.19, date: "2024-05-08", label: "Wed" },
          { sales: 1165.44, date: "2024-05-09", label: "Thu" },
          { sales: 1157.2, date: "2024-05-10", label: "Fri" },
          { sales: 841.19, date: "2024-05-11", label: "Sat" },
          { sales: 664.9, date: "2024-05-12", label: "Sun" },
          { sales: 1451.37, date: "2024-05-13", label: "Mon" },
          { sales: 1292.02, date: "2024-05-14", label: "Tue" },
        ],
      },
    ],
  },
  {
    store_id: 16778,
    total_sales: 7660.77,
    store_name: "Mechanicsville",
    overall_ranking: 4,
    heading: "## Subway Mechanicsville (16778) - May 8th - May 14th",
    summary:
      "### Summary  \n- Peak customer inflow during lunchtime and evenings, suggesting opportunity for targeted promotional offers.\n- Corinne Smith logged minor overtime, indicating a need for better hour distribution among staff.\n- Utilizing footlong sandwiches' popularity with targeted third-party and time-based promotions could boost sales.",
    insight:
      "\n### Sales Numbers:\n- **Total Sales**: $7,660.77 (sum of each day's total sales)\n- **Footlong Sales**: Footlong sandwiches continue to outperform 6-inch sandwiches, contributing to 61%-66% of the total daily unit sales, e.g., on May 10th, 65% of the total units sold were Footlongs.\n- **Top 3 Sales Hours of the Week**:\n  1. **5:00 PM - 6:00 PM** on May 13th: $107.23\n  2. **1:00 PM - 2:00 PM** on May 9th: $138.32\n  3. **6:00 PM - 7:00 PM** on May 9th: $191.89\n- **3PL Sales**: The use of third-party logistics (3PL) has generated a combined total of $409.45 over the week. \n  - **DoorDash**: $313.79\n  - **Grubhub**: $166.97\n\n### Insights:\n1. **Peak Hours Analysis**:\n    - The peak hours suggesting high customer inflow primarily occur around lunchtime (1:00 PM - 2:00 PM) and evenings (5:00 PM - 6:00 PM, 6:00 PM - 7:00 PM).\n    - Specific promotional offers, such as discounts on combo meals or add-ons during these hours could result in higher average transaction values.\n\n2. **3PL Opportunity**:\n   - The data indicates a growing trend in third-party sales. Implementing targeted promotions, such as a **\"Buy 2 Footlongs, Get 1 Free\"** offer, specifically for third-party delivery platforms could further drive these sales.\n\n3. **Transaction Analysis**:\n   - The **average transaction value** is highest on lower foot traffic days, suggesting those customers may be buying more. For example, May 12th had a lower transaction count (61 transactions) but a high average transaction value of $12.55.\n \n### Labor:\n- **Total Hours Worked**: 370.35 hours\n- **Overtime Hours**: 1.62 hours only (by Corinne Smith)\n- **Top Contributors**:\n  - **Corinne Smith**: 55.73 hours (including 1.62 overtime)\n  - **Nate Pyle**: 44.55 hours\n  - **Theodore Thomas**: 35.45 hours (no overtime)\n  - **Ziya Davis**: 37.50 hours\n\n### Summarized Insights:\n1. **Sales Stability**: Sales volumes demonstrate relative stability across the days, with peak performance appearing on May 9th. Maintaining engagement during peak days and times can be crucial for consistent performance.\n2. **Employee Allocation**: Corinne Smith had a minor overtime issue, indicating a need for better distribution of hours among staff. Additional hours can be allocated to employees with fewer total hours logged, such as Alexa Hartig (3.25 hours) and Jayden Harty (11.15 hours).\n3. **Promotion Potential**: Utilizing footlongs' popularity in targeted third-party promotions could continue to elevate sales. Furthermore, with the top sales hours identified, time-based promotions during peak times could maximize transaction values.\n\n### Conclusion:\nMechanicsville Subway exhibits consistent performance with specific opportunities for improvement, particularly in labor allocation and targeted promotions. Leveraging foot traffic data and optimizing labor costs will be pivotal in sustained profitability.",
    charts: [
      {
        name: "Daily sales chart",
        id: "daily_sales_chart",
        data: [
          { sales: 1199.56, date: "2024-05-08", label: "Wed" },
          { sales: 1332.95, date: "2024-05-09", label: "Thu" },
          { sales: 1098.22, date: "2024-05-10", label: "Fri" },
          { sales: 1060.71, date: "2024-05-11", label: "Sat" },
          { sales: 765.3, date: "2024-05-12", label: "Sun" },
          { sales: 1147.82, date: "2024-05-13", label: "Mon" },
          { sales: 1056.21, date: "2024-05-14", label: "Tue" },
        ],
      },
    ],
  },
  {
    store_id: 68722,
    total_sales: 7314.77,
    store_name: "Hughesville",
    overall_ranking: 5,
    heading: "## Subway Hughesville (68722) - May 8th - May 14th",
    summary:
      "### Summary  \n- Substantial sales drop on Sundays suggests potential for targeted promotions.\n- A consistent foot traffic with transactions peak on May 8th and May 13th.\n- Majority sales occur through eat-in, suggesting a possible push on delivery methods.",
    insight:
      "\n#### **Sales Numbers:**\n- **Total Sales for the Week:** $7,314.90 \n- **Sales by Segment:**\n  - **Eat-In Sales:** Predominantly the highest contributor, with a total of $6,431.42 (~88%) for the week.\n  - **Take-Out Sales:** Moderate contribution totaling $907.39 (~12%).\n  - **Delivery & Third Party Sales:** Minimal influence in overall sales contributing to $ 170.13.\n\n- **Top Selling Hours:**\n  - **12:00 PM - 1:00 PM:** Average sales across days indicate this is the peak hour contributing significant sales. E.g., May 8th ($146.89), May 9th ($181.43).\n  - **2:00 PM - 3:00 PM:** Significant activity, e.g., May 8th ($221.48), May 13th ($138.82).\n  - **3:00 PM - 4:00 PM:**  Ranks third, showcasing busy hours post-lunch peak. E.g., May 8th ($86.79), May 10th ($61.31). \n\n- **Peak Sales Day:** \n  - **May 8th:** Highest total sales recorded at $1,492.53.\n  \n#### **Category Insights:**\n- **Product Preference:**\n  - **Footlongs:** Dominant category with 63.38% of total units sold, performing better than 6-inch variants.\n  - **6-Inch Subs:** Limited engagement, contributing to 36.24% units.\n  \n- **Top Sold Items:**\n  - **May 8th:** Turkey Footlong (14), Steak Footlong (11).\n  - **May 13th:** Steak Footlong (11), Turkey 6-Inch (10), Tuna Footlong (8).\n  \n- **3PL Sales:**\n  - **Minimal Dependency:** Only a $170.13 contribution across DoorDash and other platforms, suggesting a focus on in-store promotions for growth in these segments.\n\n#### **Labor Insights:**\n- **Total Labor Hours:** 454.22 hours.\n- **Labor Cost Optimization Opportunities:**\n  - **Overtime Analysis:** Only 2.98 hours of overtime by Germaine King. Allocating these hours to one of the other employees could streamline costs.\n  - **Most Active Employees:** Germaine King (58.18 hrs.), Chase Rutledge (53.85 hrs.), Ronald Carter (48.62 hrs.)\n  \n- **Efficiency Opportunities:** Reducing labor hours on low foot-traffic days (May 12th) and reallocating to peak days (May 8th, May 13th) could balance workload without incurring additional costs.\n\n### **Summary and Recommendations:**\n- **Focus on Sunday Engagement:** Consider promotions or localized events to attract foot traffic on Sundays which record the lowest sales.\n- **Maximize Peak Hours:** Target promotions between 12:00 PM - 1:00 PM to 3:00 PM to 4:00 PM as this is consistently high traffic.\n- **Reallocate Labor Efficiently:** Monitor employee schedule to ensure high efficiency, especially avoiding unnecessary overtime costs.\n- **Third-Party Delivery Optimizations:** Explore and incentivize third-party sales channels to diversify revenue streams.\n\nBy analyzing the data trends and insights from this week, strategic recommendations can be actioned to optimize sales, labor costs, and customer engagement for Hughesville, MD store (68722).",
    charts: [
      {
        name: "Daily sales chart",
        id: "daily_sales_chart",
        data: [
          { sales: 1492.53, date: "2024-05-08", label: "Wed" },
          { sales: 1214.04, date: "2024-05-09", label: "Thu" },
          { sales: 901.51, date: "2024-05-10", label: "Fri" },
          { sales: 1046.39, date: "2024-05-11", label: "Sat" },
          { sales: 469.06, date: "2024-05-12", label: "Sun" },
          { sales: 1161.61, date: "2024-05-13", label: "Mon" },
          { sales: 1029.63, date: "2024-05-14", label: "Tue" },
        ],
      },
    ],
  },
];

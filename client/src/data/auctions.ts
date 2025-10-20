// Auction data for the upcoming auctions table
export interface Auction {
  state: string;
  county: string;
  auction_date: string;
  auction_time: string;
  auction_type: string;
  sale_type: string;
  registration_deadline: string;
  deposit_requirement: string;
  num_properties: number;
  official_link: string;
  apn_parcel_id: string;
  property_address: string;
  auction_status: string;
}

export const auctions: Auction[] = [
  // Completed auctions (for testing)
  {
    state: "Idaho",
    county: "Ada County",
    auction_date: "2025-10-10",
    auction_time: "8:00 AM",
    auction_type: "Online",
    sale_type: "Tax Deed",
    registration_deadline: "2025-10-10",
    deposit_requirement: "See official site",
    num_properties: 4,
    official_link: "https://www.publicsurplus.com/sms/adaco,id/list/current?orgid=291890",
    apn_parcel_id: "Various",
    property_address: "Multiple properties in Ada County, ID",
    auction_status: "Completed"
  },
  {
    state: "California",
    county: "Riverside County",
    auction_date: "2025-10-05",
    auction_time: "9:00 AM PT",
    auction_type: "Online",
    sale_type: "Tax-Defaulted Property",
    registration_deadline: "2025-10-01",
    deposit_requirement: "$2,500 minimum",
    num_properties: 23,
    official_link: "https://www.riversidecountyca.gov/treasurer",
    apn_parcel_id: "Various",
    property_address: "Multiple properties in Riverside County, CA",
    auction_status: "Completed"
  },
  // Upcoming auctions
  {
    state: "Idaho",
    county: "Ada County",
    auction_date: "2025-10-13",
    auction_time: "8:00 AM",
    auction_type: "Online",
    sale_type: "Tax Deed",
    registration_deadline: "2025-10-13",
    deposit_requirement: "See official site",
    num_properties: 4,
    official_link: "https://www.publicsurplus.com/sms/adaco,id/list/current?orgid=291890",
    apn_parcel_id: "Various",
    property_address: "Multiple properties in Ada County, ID",
    auction_status: "Upcoming"
  },
  {
    state: "Idaho",
    county: "Bear Lake County",
    auction_date: "2025-10-14",
    auction_time: "1:00 PM",
    auction_type: "In-Person",
    sale_type: "Tax Deed",
    registration_deadline: "2025-10-14",
    deposit_requirement: "See official site",
    num_properties: 3,
    official_link: "https://www.bearlakecounty.info/treasurer.html",
    apn_parcel_id: "Various",
    property_address: "Bear Lake County Courthouse, 30 North Main, Paris, Idaho",
    auction_status: "Upcoming"
  },
  {
    state: "California",
    county: "Los Angeles County",
    auction_date: "2025-10-18",
    auction_time: "3:00 PM PT",
    auction_type: "Online",
    sale_type: "Tax-Defaulted Property",
    registration_deadline: "2025-10-14",
    deposit_requirement: "See official site",
    num_properties: 0,
    official_link: "https://ttc.lacounty.gov/schedule-of-upcoming-auctions/",
    apn_parcel_id: "Various",
    property_address: "2025B October Online Auction (Oct 18-21, 2025)",
    auction_status: "Upcoming"
  },
  {
    state: "California",
    county: "Glenn County",
    auction_date: "2025-10-29",
    auction_time: "8:00 AM PT",
    auction_type: "Online",
    sale_type: "Tax Deed",
    registration_deadline: "2025-10-28",
    deposit_requirement: "See official site",
    num_properties: 14,
    official_link: "https://www.countyofglenn.net/government/departments/finance/treasurertax-collector/property-tax-auctions",
    apn_parcel_id: "Various",
    property_address: "Multiple properties in Glenn County, CA",
    auction_status: "Upcoming"
  },
  {
    state: "California",
    county: "El Dorado County",
    auction_date: "2025-11-05",
    auction_time: "8:00 AM",
    auction_type: "Online",
    sale_type: "Tax Deed",
    registration_deadline: "2025-11-01",
    deposit_requirement: "Varies by property",
    num_properties: 168,
    official_link: "https://www.bid4assets.com/el-dorado-county-ca",
    apn_parcel_id: "Various",
    property_address: "Multiple properties in El Dorado County, CA",
    auction_status: "Registration Open"
  },
  {
    state: "California",
    county: "Los Angeles County",
    auction_date: "2025-12-06",
    auction_time: "3:00 PM PT",
    auction_type: "Online",
    sale_type: "Tax-Defaulted Property",
    registration_deadline: "2025-12-02",
    deposit_requirement: "See official site",
    num_properties: 0,
    official_link: "https://ttc.lacounty.gov/schedule-of-upcoming-auctions/",
    apn_parcel_id: "Various",
    property_address: "2025B December Online Auction (Dec 6-9, 2025)",
    auction_status: "Upcoming"
  },
  {
    state: "Connecticut",
    county: "New Haven County",
    auction_date: "2025-11-20",
    auction_time: "10:30 AM EST",
    auction_type: "In-Person",
    sale_type: "Tax Deed",
    registration_deadline: "See official site",
    deposit_requirement: "See official site",
    num_properties: 20,
    official_link: "https://www.meridenct.gov/government/departments/tax_collector",
    apn_parcel_id: "Various",
    property_address: "Multiple properties in New Haven County, CT",
    auction_status: "Upcoming"
  },
  {
    state: "Connecticut",
    county: "Windham County",
    auction_date: "2025-11-20",
    auction_time: "3:00 PM EST",
    auction_type: "In-Person",
    sale_type: "Tax Deed",
    registration_deadline: "See official site",
    deposit_requirement: "See official site",
    num_properties: 6,
    official_link: "https://www.brooklynct.org/tax-collector",
    apn_parcel_id: "Various",
    property_address: "Multiple properties in Windham County, CT",
    auction_status: "Upcoming"
  },
  {
    state: "Connecticut",
    county: "Fairfield County",
    auction_date: "2025-12-04",
    auction_time: "10:00 AM EST",
    auction_type: "In-Person",
    sale_type: "Tax Deed",
    registration_deadline: "See official site",
    deposit_requirement: "See official site",
    num_properties: 5,
    official_link: "https://www.brookfieldct.gov/tax-collector",
    apn_parcel_id: "Various",
    property_address: "Multiple properties in Fairfield County, CT",
    auction_status: "Upcoming"
  },
  {
    state: "Connecticut",
    county: "New London County",
    auction_date: "2025-12-09",
    auction_time: "10:00 AM EST",
    auction_type: "In-Person",
    sale_type: "Tax Deed",
    registration_deadline: "See official site",
    deposit_requirement: "See official site",
    num_properties: 11,
    official_link: "https://www.norwichct.org/392/Tax-Collector",
    apn_parcel_id: "Various",
    property_address: "Multiple properties in New London County, CT",
    auction_status: "Upcoming"
  },
  {
    state: "Connecticut",
    county: "Litchfield County",
    auction_date: "2025-12-11",
    auction_time: "10:00 AM EST",
    auction_type: "In-Person",
    sale_type: "Tax Deed",
    registration_deadline: "See official site",
    deposit_requirement: "See official site",
    num_properties: 3,
    official_link: "https://www.town.new-hartford.ct.us/tax-collector",
    apn_parcel_id: "Various",
    property_address: "Multiple properties in Litchfield County, CT",
    auction_status: "Upcoming"
  }
];
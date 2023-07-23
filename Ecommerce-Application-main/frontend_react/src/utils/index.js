export const Navitems = [ 
  {
    name: 'Electronics',
    link: 'electronics',
  },
  {
    name: 'Beauty',
    link: 'beauty',
  },
  {
    name: 'Men',
    link: 'men',
  },
  {
    name: 'Women',
    link: 'women',
  },
  {
    name: 'Home',
    link: 'home',
  },
  {
    name: 'Furnitures',
    link: 'furnitures',
  },
  {
    name: 'Sports',
    link: 'sports',
  },
  {
    name: 'Books',
    link: 'books',
  },
  {
    name: 'More',
    link: 'more',
  },
]

export const convertMonthNumberToName = (dateString) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const date = new Date(dateString);
  const monthIndex = date.getMonth();
  const monthName = monthNames[monthIndex + 1];
  return monthName;

}
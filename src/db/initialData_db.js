const initialUserData = {
  name: 'Santiago',
  lastname: 'Fure',
  country: 'United States',
  state: 'Texas',
  city: 'Austin',
  address: 'laprida',
  addressNumber: 294,
  telCountryPrefix: '+54',
  telCodeArea: 3541,
  telNumber: 547851,
  email: 'santiagoEfeEnElChat@gmail.com',
  idType: 'dni',
  numberId: 451223546,
  birthDay: '14/08/2002',
  monthlySalary: 1000,
  depositAccounts:[]
}
  
const initialAccountsData = [{
  beneficiary: initialUserData.name + '' + initialUserData.lastname,
  beneficiaryAddress: 'some place',
  accountNumber: '32a231241227588584534413',
  routeNumber: '232342323',
  bankName: 'meme bank',
  bankAddress: 'next to you',
  typeCoin: '',
  swiftNumber: '',
  type:'local'
},
{
  beneficiary: initialUserData.name + '' + initialUserData.lastname,
  beneficiaryAddress: 'Other City',
  accountNumber: '1231251251235213523423423123',
  routeNumber: '51513214',
  bankName: 'Bank of United States',
  bankAddress: 'chicago 2324',
  typeCoin: '',
  swiftNumber: '',
  type:'local'
},
{
  beneficiary: initialUserData.name + '' + initialUserData.lastname,
  beneficiaryAddress: 'some place',
  accountNumber: '2352352342356235235442352',
  routeNumber: '232342323',
  bankName: 'Potatos Bank',
  bankAddress: 'potato 34209',
  typeCoin: '',
  swiftNumber: '',
  type:'local'
},
{
  beneficiary: initialUserData.name + '' + initialUserData.lastname,
  beneficiaryAddress: 'some place',
  accountNumber: '52352352352352342352',
  routeNumber: '232342323',
  bankName: 'Bank Money Money',
  bankAddress: 'next to you',
  typeCoin: '',
  swiftNumber: '',
  type:'local'
},{
  beneficiary: initialUserData.name + '' + initialUserData.lastname,
  beneficiaryAddress: 'some place',
  accountNumber: '123153537596794556734576534',
  bankName: 'international meme bank',
  bankAddress: 'next to you',
  typeCoin: 'USD',
  swiftNumber: 'clas213ff232342323',
  type:'international'
}]


export {
  initialUserData,
  initialAccountsData}
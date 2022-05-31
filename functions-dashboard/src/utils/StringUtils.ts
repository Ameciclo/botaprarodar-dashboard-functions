import dayjs from './Dayjs';

const normalizeString = (text: string): string => {
  if (!text) return '';
  return text.trim().toLowerCase();
};

const capitalizeString = (text: string): string => {
  if (!text) return '';
  return (
    normalizeString(text).charAt(0).toUpperCase() +
    normalizeString(text).slice(1)
  );
};

const normalizeRacialInfo = (racial: string): string => {
  const racialString = normalizeString(racial);

  if (racialString === 'amarelo' || racialString === 'amarela') {
    return 'Amarela';
  }
  if (racialString === 'branco' || racialString === 'branca') {
    return 'Branca';
  }
  if (
    racialString === 'negra' ||
    racialString === 'negro' ||
    racialString === 'preta' ||
    racialString === 'preto'
  ) {
    return 'Preta';
  }
  if (racialString === 'parda' || racialString === 'pardo') {
    return 'Parda';
  }
  if (
    racialString === 'indigena' ||
    racialString === 'indigeno' ||
    racialString === 'indígena' ||
    racialString === 'indígeno'
  ) {
    return 'Indígena';
  }

  return 'Outra/Não deseja informar';
};

const normalizeSchoolingInfo = (
  schoolingTextInfo: string,
  schoolingStatusInfo: string,
): string => {
  if (!schoolingTextInfo || schoolingTextInfo === 'Não determinado') {
    return 'Não determinado';
  }

  if (schoolingStatusInfo === '') schoolingStatusInfo = 'Completo';

  return `${schoolingTextInfo} ${schoolingStatusInfo}`;
};

const calculateAge = (dateOfBirth: string): number => {
  const birthDate = dayjs(dateOfBirth, 'DD/MM/YYYY');
  const todayDate = dayjs();
  return todayDate.diff(birthDate, 'year');
};

const normalizeAgeInfo = (dateOfBirth: string): string => {
  const age = calculateAge(dateOfBirth);

  if (age > 0 && age <= 10) return 'Entre 0 e 10 anos';
  if (age > 10 && age <= 20) return 'Entre 11 e 20 anos';
  if (age > 20 && age <= 30) return 'Entre 21 e 30 anos';
  if (age > 30 && age <= 40) return 'Entre 31 e 40 anos';
  if (age > 40 && age <= 50) return 'Entre 41 e 50 anos';
  if (age > 50 && age <= 20) return 'Entre 51 e 60 anos';
  if (age > 60 && age <= 20) return 'Entre 61 e 70 anos';
  if (age > 70 && age <= 20) return 'Entre 71 e 80 anos';
  if (age > 80 && age <= 20) return 'Entre 81 e 90 anos';
  if (age > 90) return 'Acima de 90 anos';

  return 'Não especificado';
};

const normalizeIncomeInfo = (income: string): string => {
  if (
    income.includes('Entre') ||
    income.includes('Até') ||
    income.includes('Mais de')
  )
    return income;
  return 'Desejo não informar';
};

const intervalInMinutesBetweenDates = (
  startDateString: string,
  endDateString: string,
): number => {
  if (startDateString && endDateString) {
    const startDate = dayjs(startDateString, 'DD/MM/YYYY HH:mm:ss');
    const endDate = dayjs(endDateString, 'DD/MM/YYYY HH:mm:ss');
    return Number(endDate.diff(startDate, 'minutes', true).toFixed(2));
  }
  return 0;
};

const StringUtils = {
  normalizeString,
  normalizeRacialInfo,
  normalizeSchoolingInfo,
  normalizeAgeInfo,
  normalizeIncomeInfo,
  capitalizeString,
  intervalInMinutesBetweenDates,
};

export default StringUtils;

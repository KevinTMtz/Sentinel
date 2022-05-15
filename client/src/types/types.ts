export interface objectWithKeyStr {
  [key: string]: any;
}

export interface ReportSearchProps {
  topic: string;
  location: string | undefined;
  until: Date | undefined;
}

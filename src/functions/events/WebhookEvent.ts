export interface MyType {
  account: string;
  detail: Interaction;
  'detail-type': string;
  id: string;
  region: string;
  resources: { [key: string]: any }[];
  source: string;
  time: Date;
  version: string;
}

export interface Interaction {
  api_app_id: string;
  channel_id: string;
  channel_name: string;
  command: string;
  is_enterprise_install: string;
  response_url: string;
  team_domain: string;
  team_id: string;
  text: string;
  token: string;
  trigger_id: string;
  user_id: string;
  user_name: string;
}

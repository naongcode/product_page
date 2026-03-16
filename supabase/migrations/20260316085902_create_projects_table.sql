-- projects 테이블 생성
create table projects (
  id text primary key,
  name text not null default '새 프로젝트',
  canvas_data jsonb,
  thumbnail text,
  saved_at bigint,
  created_at timestamptz default now()
);

-- RLS 비활성화 (로그인 없이 사용)
alter table projects disable row level security;

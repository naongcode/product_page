-- canvas_data 컬럼 제거, 전체 프로젝트 데이터를 담는 data jsonb 컬럼 추가
alter table projects drop column canvas_data;
alter table projects add column data jsonb;

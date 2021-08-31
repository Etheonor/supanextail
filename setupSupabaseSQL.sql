-- Create a table for Public Profiles
create table profiles (
  id uuid references auth.users not null,
  updated_at timestamp with time zone,
  username text unique,
  avatar_url text,
  website text,
  customerId text,

  primary key (id),
  unique(username),
  constraint username_length check (char_length(username) >= 3)
);

alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Set up Storage!
insert into storage.buckets (id, name)
values ('avatars', 'avatars');

create policy "Avatar images are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'avatars' );

create policy "Any authenticated user can upload an avatar."
  on storage.objects for insert
  with check ( bucket_id = 'avatars' and auth.role() = 'authenticated' );

  -- inserts a row into public.profiles
create function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


  -- Create a table for subscriptions
create table subscriptions (
  id uuid not null,
  customer_id text,
  paid_user boolean,
  plan text,
  subscription text,

  primary key (id)
);

alter table subscriptions enable row level security;

-- Policy for user checking their sub
CREATE POLICY "User can check their sub"
ON public.subscriptions
FOR SELECT USING (
  auth.uid() = id
);

  -- Create a table for admin
create table admin_list (
  id uuid not null,
  isadmin boolean,

  primary key (id)
);

alter table admin_list enable row level security;
--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: recipe_comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recipe_comments (
    id integer NOT NULL,
    user_id integer NOT NULL,
    recipe_id integer NOT NULL,
    recipe_comment text NOT NULL,
    created_date date DEFAULT CURRENT_DATE
);


ALTER TABLE public.recipe_comments OWNER TO postgres;

--
-- Name: recipe_comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recipe_comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recipe_comments_id_seq OWNER TO postgres;

--
-- Name: recipe_comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.recipe_comments_id_seq OWNED BY public.recipe_comments.id;


--
-- Name: recipes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recipes (
    id integer NOT NULL,
    user_id integer,
    title character varying(100) NOT NULL,
    ingredients text NOT NULL,
    how_to_cook text NOT NULL,
    recipe_video_link character varying(255) NOT NULL,
    created_date date DEFAULT CURRENT_DATE,
    is_active boolean DEFAULT true,
    filename text NOT NULL,
    filepath text NOT NULL,
    mimetype text NOT NULL,
    size bigint NOT NULL
);


ALTER TABLE public.recipes OWNER TO postgres;

--
-- Name: recipes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recipes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recipes_id_seq OWNER TO postgres;

--
-- Name: recipes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.recipes_id_seq OWNED BY public.recipes.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(100) NOT NULL,
    phone_number character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    level integer,
    is_active boolean DEFAULT false
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: recipe_comments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_comments ALTER COLUMN id SET DEFAULT nextval('public.recipe_comments_id_seq'::regclass);


--
-- Name: recipes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipes ALTER COLUMN id SET DEFAULT nextval('public.recipes_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: recipe_comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recipe_comments (id, user_id, recipe_id, recipe_comment, created_date) FROM stdin;
\.


--
-- Data for Name: recipes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recipes (id, user_id, title, ingredients, how_to_cook, recipe_video_link, created_date, is_active, filename, filepath, mimetype, size) FROM stdin;
21	40	Ayam Bakar Taliwang	ayam kampung muda, jeruk nipis, serai, cabai, minyak goreng	https://www.maggi.id/recipes/ayam-bakar-taliwang/	https://www.youtube.com/watch?v=Iw_KY_HiQWo	2022-04-20	t	1650445730191_90be7b46-1e88-472b-922e-a08312bc9681_43.jpg	public\\recipe\\1650445730191_90be7b46-1e88-472b-922e-a08312bc9681_43.jpg	image/jpeg	68662
22	40	Es Sarang Burung	agar-agar putih, sirup melon/cocopandan, kelengkeng	https://dapurkecil-blog-blog.tumblr.com/post/1081101125/es-sarang-burung-ala-hoka-bento	https://www.youtube.com/watch?v=WwNJdoS2MIs	2022-04-20	t	1650470116407_66093218_340892220165426_7349652580799691562_n.jpg	public\\recipe\\1650470116407_66093218_340892220165426_7349652580799691562_n.jpg	image/jpeg	214624
23	39	Laksa Betawi	ayam kampung, kaldu ayam, kecap manis, udang, daun jeruk, susu rendah lemak	https://www.masakapahariini.com/resep/resep-laksa-betawi/	https://www.youtube.com/watch?v=8rrJwiyZ8cg	2022-04-20	t	1650470826472_1711067284191065-laksa-betawi.jpeg	public\\recipe\\1650470826472_1711067284191065-laksa-betawi.jpeg	image/jpeg	135002
24	39	Batagor Bandung	kulit pangsit, tahu putih, ikan tenggiri, daun bawang, bawang putih	https://www.kompas.com/food/read/2020/09/06/190900275/cara-membuat-batagor-bandung-ala-abang-penjual?page=all	https://www.youtube.com/watch?v=rwk4GLo3_PU	2022-04-20	t	1650471313182_5f54c3ebb1d41.jpg	public\\recipe\\1650471313182_5f54c3ebb1d41.jpg	image/jpeg	114963
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, phone_number, password, level, is_active) FROM stdin;
34	Togar Simamora	togar@abc.com	081387254433	$2b$10$oYkzi4S5/QUaTzWN8tCCPuAraKJi//Vw86oh1ZwD2YDi/Z0HdtSm6	1	f
37	Muhammad Jefri Maulana	mjm@abc.com	081287351480	$2b$10$opLicjmlIsyeTj6.38lUfO.ucvMKbFZaRSxwARUgubU.vLrTHx91m	1	f
38	Lukas Latupeirissa	lukas@abc.com	081237450021	$2b$10$z4E6leulwNHH6XtXEQD7peHtrV.KABbEPAjL4atD3V2w7dsCA8g7a	1	f
40	Gendhis Sukmawati	gendhis@abc.com	081273341403	$2b$10$3dAyE177g8eKwvQDQum4GuIPpEGO7atbMw/GiWZZOfSVBuHhKFicC	1	f
41	Denny Ahmadi	dahmad@abc.com	081236361894	$2b$10$qNvVqCn6FRGfMTJ93T6a1uLLqebs.qP7HQ2.OfKkNKFbuuQ43lSaW	1	f
42	Nur Hikmat Subrata	nhs@abc.com	083819772341	$2b$10$49y5izhAQeStSRDoHPY5Xe3kILDsI4ouYxQoyzKOwbvm0Yl1P7e8C	1	f
33	Ahmad Suryanto	ahms@abc.com	082227831960	$2b$10$pjtyizywkPhmbMJOko2Hg.1Ibd55V/Xu/Zbht2Aolyr4kL7aV8p3G	0	t
35	Delisa Sukmawati	delisa@abc.com	085627813340	$2b$10$oFDTnaVjs3d6AmeI7c0fCOJ1urR6A4vf83DYArmj.FYd5u9dE/GM2	0	t
43	Wahyu Sutanto	wahyu@abc.com	088814728378	$2b$10$KkQ/TxyijUVMMLJDtWxNbuWWCexwGPB6WnKpxZocbpV7L2qZTBIfa	1	t
44	Dicky Supriyatno	d1cky@abc.com	089923738110	$2b$10$I8mHVXm3iKfVokh8XN/ZyO41VI5PbW/QiD5Yyhzmn7veS2W1V28ka	1	f
45	Jenna Wahyuningsih	jenna@abc.com	081138384009	$2b$10$kANW.h7cfpzkequsbXbYuuLVbAkTNCmX3869KT5b2fcdpxs8arLNW	0	f
46	Heru Siswanto	herus@abc.com	081272630955	$2b$10$3q4FAVygjoDI6YvScdkwAekvZrpHmh7I5dD3xxjA.nKHsrccPo6y.	1	f
39	Aisyah Maryati	aisyahm@abc.com	088834275611	$2b$10$CKmST9t22gVegSlxIlM8COvEycQftaLqNS9rO1pvdSk8xtgUQrqiK	1	f
36	Putri Faza Puspita	pu_pus@abc.com	087813229038	$2b$10$OIlCBU.B5f44jKoNSF9NeeV4Bn0Nxog8XuoVC1iUCJL//Ju88dNj6	1	t
\.


--
-- Name: recipe_comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recipe_comments_id_seq', 6, true);


--
-- Name: recipes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recipes_id_seq', 24, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 46, true);


--
-- Name: recipe_comments recipe_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_comments
    ADD CONSTRAINT recipe_comments_pkey PRIMARY KEY (id);


--
-- Name: recipes recipes_filename_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_filename_key UNIQUE (filename);


--
-- Name: recipes recipes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_phone_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_phone_number_key UNIQUE (phone_number);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: recipe_comments recipe_comments_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_comments
    ADD CONSTRAINT recipe_comments_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: recipe_comments recipe_comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_comments
    ADD CONSTRAINT recipe_comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: recipes recipes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--


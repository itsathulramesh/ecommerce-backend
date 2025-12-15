--
-- PostgreSQL database dump
--

\restrict wwsAZ35Q3UILlIWezHv4ZR7Yueck1OeClfS5HOnm4fAzzT30AndLKITfk0OQt02

-- Dumped from database version 16.11
-- Dumped by pg_dump version 16.11

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
-- Name: CartItem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CartItem" (
    id integer NOT NULL,
    quantity integer DEFAULT 1 NOT NULL,
    "userId" integer NOT NULL,
    "productId" integer NOT NULL
);


ALTER TABLE public."CartItem" OWNER TO postgres;

--
-- Name: CartItem_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CartItem_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CartItem_id_seq" OWNER TO postgres;

--
-- Name: CartItem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CartItem_id_seq" OWNED BY public."CartItem".id;


--
-- Name: Order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Order" (
    id integer NOT NULL,
    total double precision NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" integer NOT NULL
);


ALTER TABLE public."Order" OWNER TO postgres;

--
-- Name: OrderItem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."OrderItem" (
    id integer NOT NULL,
    quantity integer NOT NULL,
    price double precision NOT NULL,
    "orderId" integer NOT NULL,
    "productId" integer NOT NULL
);


ALTER TABLE public."OrderItem" OWNER TO postgres;

--
-- Name: OrderItem_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."OrderItem_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."OrderItem_id_seq" OWNER TO postgres;

--
-- Name: OrderItem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."OrderItem_id_seq" OWNED BY public."OrderItem".id;


--
-- Name: Order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Order_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Order_id_seq" OWNER TO postgres;

--
-- Name: Order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Order_id_seq" OWNED BY public."Order".id;


--
-- Name: Product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Product" (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    price double precision NOT NULL,
    "imageUrl" text,
    stock integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Product" OWNER TO postgres;

--
-- Name: Product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Product_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Product_id_seq" OWNER TO postgres;

--
-- Name: Product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Product_id_seq" OWNED BY public."Product".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: CartItem id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CartItem" ALTER COLUMN id SET DEFAULT nextval('public."CartItem_id_seq"'::regclass);


--
-- Name: Order id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order" ALTER COLUMN id SET DEFAULT nextval('public."Order_id_seq"'::regclass);


--
-- Name: OrderItem id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem" ALTER COLUMN id SET DEFAULT nextval('public."OrderItem_id_seq"'::regclass);


--
-- Name: Product id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product" ALTER COLUMN id SET DEFAULT nextval('public."Product_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: CartItem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CartItem" (id, quantity, "userId", "productId") FROM stdin;
3	1	1	1
\.


--
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Order" (id, total, "createdAt", "userId") FROM stdin;
\.


--
-- Data for Name: OrderItem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."OrderItem" (id, quantity, price, "orderId", "productId") FROM stdin;
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Product" (id, name, description, price, "imageUrl", stock, "createdAt", "updatedAt") FROM stdin;
2	Samsung s23	Latest samsung phone	59999	https://example.com/samsung.png	25	2025-12-15 07:00:33.861	2025-12-15 07:00:33.861
4	iPhone 15 Pro	Apple flagship phone with A17 chip	129999	https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-black-titanium	10	2025-12-15 09:47:59.36	2025-12-15 09:47:59.36
5	Samsung Galaxy S24 Ultra	Samsung flagship with Snapdragon Gen 3	119999	https://images.samsung.com/is/image/samsung/p6pim/in/sm-s928bzkgins/gallery	12	2025-12-15 09:47:59.381	2025-12-15 09:47:59.381
6	MacBook Air M2	Apple MacBook with M2 chip	114999	https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-m2-midnight	8	2025-12-15 09:47:59.394	2025-12-15 09:47:59.394
7	Sony WH-1000XM5	Noise cancelling wireless headphones	29999	https://www.sony.co.in/image/wh1000xm5.jpg	20	2025-12-15 09:47:59.41	2025-12-15 09:47:59.41
8	Apple Watch Series 9	Smartwatch with health tracking	45999	https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/apple-watch-series-9	15	2025-12-15 09:47:59.424	2025-12-15 09:47:59.424
9	iPad Pro 11-inch	Powerful tablet with M2 chip	81999	https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-pro-11	9	2025-12-15 09:47:59.437	2025-12-15 09:47:59.437
10	Logitech MX Master 3S	Advanced wireless mouse	9999	https://resource.logitech.com/mx-master-3s.jpg	25	2025-12-15 09:47:59.449	2025-12-15 09:47:59.449
11	Keychron K2 Mechanical Keyboard	Wireless mechanical keyboard	8999	https://cdn.shopify.com/keychron-k2.jpg	30	2025-12-15 09:47:59.46	2025-12-15 09:47:59.46
12	Sony PlayStation 5	Next-gen gaming console	54999	https://gmedia.playstation.com/is/image/SIEPDC/ps5-console	5	2025-12-15 09:47:59.471	2025-12-15 09:47:59.471
13	Xbox Series X	Powerful gaming console	52999	https://assets.xbox.com/xbox-series-x.jpg	6	2025-12-15 09:47:59.483	2025-12-15 09:47:59.483
14	AirPods Pro (2nd Gen)	Wireless earbuds with ANC	24999	https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-pro	20	2025-12-15 09:47:59.495	2025-12-15 09:47:59.495
15	OnePlus 12	High performance Android phone	64999	https://image01.oneplus.net/oneplus12.jpg	18	2025-12-15 09:47:59.507	2025-12-15 09:47:59.507
16	JBL Charge 5	Portable Bluetooth speaker	14999	https://in.jbl.com/charge-5.jpg	22	2025-12-15 09:47:59.52	2025-12-15 09:47:59.52
17	Canon EOS R10	Mirrorless camera for creators	88999	https://in.canon/media/eos-r10.jpg	6	2025-12-15 09:47:59.537	2025-12-15 09:47:59.537
18	Dell XPS 13	Premium ultrabook	99999	https://i.dell.com/sites/csimages/App-Merchandizing_Images/all/xps-13-9315-laptop.jpg	7	2025-12-15 09:47:59.556	2025-12-15 09:47:59.556
19	Samsung 55-inch 4K TV	Crystal UHD Smart TV	55999	https://images.samsung.com/is/image/samsung/55inch-tv	10	2025-12-15 09:47:59.573	2025-12-15 09:47:59.573
20	Amazon Echo (5th Gen)	Smart speaker with Alexa	10499	https://m.media-amazon.com/echo-5.jpg	25	2025-12-15 09:47:59.588	2025-12-15 09:47:59.588
21	Google Nest Hub	Smart display	8999	https://store.google.com/nest-hub.jpg	12	2025-12-15 09:47:59.603	2025-12-15 09:47:59.603
22	Mi Smart Band 8	Fitness tracker	3999	https://i01.appmifile.com/mi-band-8.jpg	40	2025-12-15 09:47:59.615	2025-12-15 09:47:59.615
23	HP Pavilion Gaming Laptop	Gaming laptop with RTX graphics	89999	https://ssl-product-images.www8-hp.com/pavilion-gaming.jpg	5	2025-12-15 09:47:59.627	2025-12-15 09:47:59.627
1	iPhone 16 pro	Latest Apple phone	89999	https://example.com/iphone.png	15	2025-12-15 06:31:26.755	2025-12-15 11:43:14.984
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, name, email, password, "createdAt", "updatedAt") FROM stdin;
1	athul	athul@gmail.com	$2b$10$o9dB4RS1O08nX.VB7RsRTujMDw83vDcYABdWU09EgQEM0TKF6KZUO	2025-12-15 04:55:56.717	2025-12-15 04:55:56.717
2	John Doe	john@example.com	$2b$10$wSuXMRK/pAYovlVmGCH8sukUorBGmtavL7C325rAifLOpeObkbtfq	2025-12-15 07:22:08.588	2025-12-15 07:22:08.588
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
445db532-e66c-44e5-b9e9-5ff30dd3b126	bfe60d08ba705c9e9d65062f58d6fe9ba7325ad7ffc1c3fbe4eae8451f7a6820	2025-12-15 04:51:14.19164+00	20251212101428_init	\N	\N	2025-12-15 04:51:14.112122+00	1
fa666a5a-5f27-4ba9-b314-e2919fbfa4fb	e64fc1330112e7a2653447de9ef4b174cd6a9b3744211079950d7e1d67a2e9dd	2025-12-15 09:35:34.226163+00	20251215093534_test	\N	\N	2025-12-15 09:35:34.16826+00	1
\.


--
-- Name: CartItem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CartItem_id_seq"', 4, true);


--
-- Name: OrderItem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."OrderItem_id_seq"', 1, false);


--
-- Name: Order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Order_id_seq"', 1, false);


--
-- Name: Product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Product_id_seq"', 23, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 2, true);


--
-- Name: CartItem CartItem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CartItem"
    ADD CONSTRAINT "CartItem_pkey" PRIMARY KEY (id);


--
-- Name: OrderItem OrderItem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_pkey" PRIMARY KEY (id);


--
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: CartItem_userId_productId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "CartItem_userId_productId_key" ON public."CartItem" USING btree ("userId", "productId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: CartItem CartItem_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CartItem"
    ADD CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: CartItem CartItem_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CartItem"
    ADD CONSTRAINT "CartItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: OrderItem OrderItem_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: OrderItem OrderItem_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Order Order_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

\unrestrict wwsAZ35Q3UILlIWezHv4ZR7Yueck1OeClfS5HOnm4fAzzT30AndLKITfk0OQt02


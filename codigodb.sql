--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.1
-- Dumped by pg_dump version 9.6.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: questions; Type: TABLE; Schema: public; Owner: codi
--

CREATE TABLE questions (
    user_id integer,
    question_id integer NOT NULL,
    question_text text,
    create_time timestamp with time zone DEFAULT ('now'::text)::timestamp without time zone,
    status character varying(64),
    port_id integer,
<<<<<<< HEAD
    ip_address character varying(64)
=======
    ip_address character varying(64),
    question_title character varying(128) NOT NULL
>>>>>>> b1462fc20a287ab2c06d9f5e1e184681b9ee2abb
);


ALTER TABLE questions OWNER TO codi;

--
-- Name: questions_question_id_seq; Type: SEQUENCE; Schema: public; Owner: codi
--

CREATE SEQUENCE questions_question_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE questions_question_id_seq OWNER TO codi;

--
-- Name: questions_question_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: codi
--

ALTER SEQUENCE questions_question_id_seq OWNED BY questions.question_id;


--
-- Name: responses; Type: TABLE; Schema: public; Owner: codi
--

CREATE TABLE responses (
    user_id integer,
    response_id integer NOT NULL,
    question_id integer,
    response_text text,
    create_time timestamp with time zone DEFAULT now(),
    status character varying(64),
    port_id integer,
    ip_address character varying(64),
    code_snippet text
);


ALTER TABLE responses OWNER TO codi;

--
-- Name: responses_response_id_seq; Type: SEQUENCE; Schema: public; Owner: codi
--

CREATE SEQUENCE responses_response_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE responses_response_id_seq OWNER TO codi;

--
-- Name: responses_response_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: codi
--

ALTER SEQUENCE responses_response_id_seq OWNED BY responses.response_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: codi
--

CREATE TABLE users (
    username character varying(64),
    password character varying(64),
    questions_asked integer DEFAULT 0,
    questions_answered integer DEFAULT 0,
    user_id integer NOT NULL,
    cookie_id character varying(256)
);


ALTER TABLE users OWNER TO codi;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: codi
--

CREATE SEQUENCE users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_user_id_seq OWNER TO codi;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: codi
--

ALTER SEQUENCE users_user_id_seq OWNED BY users.user_id;


--
-- Name: questions question_id; Type: DEFAULT; Schema: public; Owner: codi
--

ALTER TABLE ONLY questions ALTER COLUMN question_id SET DEFAULT nextval('questions_question_id_seq'::regclass);


--
-- Name: responses response_id; Type: DEFAULT; Schema: public; Owner: codi
--

ALTER TABLE ONLY responses ALTER COLUMN response_id SET DEFAULT nextval('responses_response_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: codi
--

ALTER TABLE ONLY users ALTER COLUMN user_id SET DEFAULT nextval('users_user_id_seq'::regclass);


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: codi
--

<<<<<<< HEAD
COPY questions (user_id, question_id, question_text, create_time, status, port_id, ip_address) FROM stdin;
=======
COPY questions (user_id, question_id, question_text, create_time, status, port_id, ip_address, question_title) FROM stdin;
>>>>>>> b1462fc20a287ab2c06d9f5e1e184681b9ee2abb
\.


--
-- Name: questions_question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: codi
--

SELECT pg_catalog.setval('questions_question_id_seq', 1, false);


--
-- Data for Name: responses; Type: TABLE DATA; Schema: public; Owner: codi
--

COPY responses (user_id, response_id, question_id, response_text, create_time, status, port_id, ip_address, code_snippet) FROM stdin;
\.


--
-- Name: responses_response_id_seq; Type: SEQUENCE SET; Schema: public; Owner: codi
--

SELECT pg_catalog.setval('responses_response_id_seq', 1, false);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: codi
--

COPY users (username, password, questions_asked, questions_answered, user_id, cookie_id) FROM stdin;
kobe	lakers	\N	\N	1	\N
\N	\N	\N	\N	3	\N
bobby	hi	\N	\N	4	\N
\N	\N	\N	\N	5	\N
<<<<<<< HEAD
=======
derek	$2a$10$hLhpG/krM.jo04tb47ZbTefzHkb63eKgZUfLP3B.Ux3BU21LVOMBC	0	0	7	\N
derek2	$2a$10$AN22J/NAJoaS6pb0q3eRhuSBC8GTXFzHdAfn77iGP8jpnmbXoLKHy	0	0	9	\N
derek3	$2a$10$DctBSaLDMlkGUG9dKko4oOY3aoei3rFK1oHfS.RzMJDcTE4Q/TjU6	0	0	10	\N
kareem	$2a$10$hydjnsV3fuqlfkP61CkxY.5DUmMKANnGPy8tVyOc4CtRe5bfj3AHq	0	0	11	\N
kareem1	$2a$10$.nKnuoipJ7R/QCydsgITOen10gZy8.z962gYPXasp0UCWGTXv./S2	0	0	12	\N
kareem2	$2a$10$uKD.JUYcHJeKsGQoiettL.9qAlaZWKULSssFyAUQxCLsPvhpMmBz6	0	0	13	\N
kareem3	$2a$10$2Jl5QZQ4aSb0GuusinEStukLXNVoXDFdZMNx09533Fi1ghxA1g35.	0	0	15	\N
kareem4	$2a$10$SPBFVwXkrNz9pUNTXwndJec/loi7vOKwRRk70Bx1H8l3ffpuVv7j.	0	0	16	\N
kareem5	$2a$10$Y/yZ9SaNoer.pm2FZP1RBuD1Rm2oMD0ndj7cTsF0h8NhZSas51I4a	0	0	17	\N
kareem6	$2a$10$zn7NKHqtsnMYepFSSiDSueGNnbAU8qtRJi2Z8UkHtr9bKblQyA01.	0	0	18	\N
kareem7	$2a$10$8M284sIrWBJrZBMj6Xrsr.u6r2q3yGOAXRxU8f5i/de7aW6No6.Ie	0	0	19	\N
kareem8	$2a$10$YJqEDsJqIyDGMDs25E..G.e3y0L0mWilGRC1l0WybLPlJIR2nHm3W	0	0	20	\N
kareem33	$2a$10$MoeZmWxXw868EBMsvpag0.0hAcNT.S/D2pFVpnZWlQZ41fuhSb1ke	0	0	22	\N
kareem34	$2a$10$fQ/9iK/0B8UeYKnYa167TumE7aGwQ0apS6suzXgnAxXfPl4EFzNbO	0	0	23	\N
kareem35	$2a$10$4o8zk1u6BVdAbtVa1ap2aunevCnOKbHpdo27nEpHLV04/I3bIJi6m	0	0	24	\N
kareem36	$2a$10$Sf2hKhdLP2yjWkOB2Tel9OX9JLxBVjU8ITnt/NbTHNt6kDNjJMfV6	0	0	25	\N
kareem37	$2a$10$4lGG7yUxfU/NExtqk8ab3OAFO6JF3qx6LY5m/ElNAqVxPhCHePC8C	0	0	26	\N
kareem38	$2a$10$/I9FrJs.vcDCJE829JP3SOErZ1zKwSUkp4kVVpqHsfZ9GEJw.HNVu	0	0	27	\N
kareem39	$2a$10$24w4xMonJiaO93wHy5iFI.pLE/gS8B63D.G47CTOnt7wRvrShVmki	0	0	28	\N
kareem40	$2a$10$ritFl6oXvSILRrRjH/kROeBOtIPRGHrrQAo.mUfFiIjpdwxfovxQ.	0	0	29	\N
kareem41	$2a$10$5.a5IavS9o4dkb/P/3vpy.L1CdrMvKBukrEghVCHgUuaQZYwKYSie	0	0	30	\N
kareem42	$2a$10$.iRZcgnqdz8AROrqS/ZriOKwge38a0oy9t4eLvdncpqnyaY1sPuEC	0	0	31	\N
kareem45	$2a$10$bV4a83lLxgjBvtUeyJm2qeXXCIScY4xe8ihpzve.WpSH46KYfB8Oy	0	0	33	\N
kareem46	$2a$10$Am7W6l0wwnxJ.bkvYCdhneHtQg0UNsqJUWsmyXZnI4RsFmTWCgMqy	0	0	34	\N
kareem47	$2a$10$RVzj.DJ8nJ37ywgkiV/s3eoeOrj4hxvfc3DLKJevCaRgpe2weDjsC	0	0	35	\N
kareem48	$2a$10$xg2WN0c8iE9.n12lo4F6re49ZYh5pWdGw1lQMr/3NKmp8eMkLSk36	0	0	36	\N
kareem49	$2a$10$CdlCVI5ORB0KZIvqBTaAruDU10P5BSjUs54q4ZTtoF7vCULGG/Jn.	0	0	37	\N
kareem50	$2a$10$zsqUd02PKgweKPmtd7NVQeanRxTyK0SG9H1awg68PjeXfeWVOooNW	0	0	38	\N
kareem51	$2a$10$bxvYeZr3Ohl93QUDdnmIZedD9sQKEfa.jt853bG3hE6sJEoQBJWx.	0	0	39	\N
kareem52	$2a$10$JYUSaEZIPmswItM3LyCozOoCoFl7sUwJSL3o65uCRW81Yi6gtxkNG	0	0	40	\N
kareem54	$2a$10$q0DnQyg5MnP2FWD.BlRVlei8BJhMK/5pil.aQT9Y4Ob54cBQc1gpC	0	0	41	\N
kareem55	$2a$10$RrbiCi97hqKYFg3PBwo75OplePLdO/0kwNgLfWVQbibKUrG1c9l.u	0	0	42	\N
\N	\N	0	0	43	\N
kareem56	$2a$10$LovSzpVNJ2GcVlnoWA4wcOSmLDL1w/.slYwZAIJIQizyq9uNgGppa	0	0	44	\N
kareem57	$2a$10$jathyitkjz14d5A8.EmHNOhmoGfILEY1qrz5neNnh56fsI8vcVp4.	0	0	45	\N
\N	\N	0	0	46	\N
kareem58	$2a$10$JC4y8XH/xehSpB/rEVPX9uxe4TpEV/I7ttpkzfwMHPltpDtWI80de	0	0	47	\N
\N	\N	0	0	48	cookietime
kareem59	$2a$10$dDkNUMh8sZ9FEpRZ7r65Oej88rmdyaexugjm2LovvWOplspFJ9vyq	0	0	49	\N
kareem60	$2a$10$WiwhykDSmHLtSf8MmmSh8.ID.1CyLVSI3o12Qjnlc6Vaniy6ekd8K	0	0	50	cookietime
kareem61	$2a$10$hn2lsCev/S449XoL1/6ZseccqdsHNt8DCeeBVMouRUcMWYzEPFzJO	0	0	51	\N
kareem62	$2a$10$mhJw8RRIx1u1ZvxzaX9rL.3HNOqC9YU.wY0IcYrswu41knJ5BcV/S	0	0	52	\N
kareem63	$2a$10$emiR/n7EWwXo5hn9aY2VV.n9Yz88kd3pGZzXuj1eMmNE/7.iR3Vdq	0	0	53	\N
kareem64	$2a$10$0UklkgjLSy4I5GRDFhPirOke/WbYBCJ06TYzPsrUq4cHIi2cX4kGS	0	0	54	\N
kareem65	$2a$10$sBlL.HWFLYb6YUk95pbUmuDNGDYBLpgOFzNi9GkmcJfCb2qv1V8J.	0	0	55	$2a$10$Gret90bQznJzELzu5oQv6eBCSByS.wAHj8aYKl4RVbjvqzP35QAdq
kareem66	$2a$10$3IsZd4GiLxDUIxLOtbkTR.T.GlwOjLdCHTxXHyLkbllO/umYkKDXK	0	0	56	$2a$10$l48EpdnsfzYR5JBU7VvDReK.XOPy65KSSB0XXxUXDPwZxAVZ9rM5W
>>>>>>> b1462fc20a287ab2c06d9f5e1e184681b9ee2abb
\.


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: codi
--

<<<<<<< HEAD
SELECT pg_catalog.setval('users_user_id_seq', 6, true);
=======
SELECT pg_catalog.setval('users_user_id_seq', 56, true);
>>>>>>> b1462fc20a287ab2c06d9f5e1e184681b9ee2abb


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: codi
--

ALTER TABLE ONLY questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (question_id);


--
-- Name: responses responses_pkey; Type: CONSTRAINT; Schema: public; Owner: codi
--

ALTER TABLE ONLY responses
    ADD CONSTRAINT responses_pkey PRIMARY KEY (response_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: codi
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: codi
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: questions questions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: codi
--

ALTER TABLE ONLY questions
    ADD CONSTRAINT questions_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(user_id);


--
-- Name: responses responses_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: codi
--

ALTER TABLE ONLY responses
    ADD CONSTRAINT responses_question_id_fkey FOREIGN KEY (question_id) REFERENCES questions(question_id);


--
-- Name: responses responses_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: codi
--

ALTER TABLE ONLY responses
    ADD CONSTRAINT responses_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(user_id);


--
-- PostgreSQL database dump complete
--


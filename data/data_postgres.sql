use classes;
INSERT INTO public."Grades"
VALUES (1, 6, 'sexto'),
    (2, 5, 'quinto');
INSERT INTO public."Teachers"
VALUES (
        1,
        'Carlos',
        'Quintero',
        '2022-06-29 02:45:48.431',
        '2022-06-29 02:45:48.431',
        true,
        false
    ),
    (
        2,
        'Daniel',
        'Millan',
        '2022-06-29 03:01:16.360',
        '2022-06-29 03:01:16.360',
        true,
        false
    );
INSERT INTO public."Courses"
VALUES (1, 601, 1, 1, true),
    (2, 501, 2, 2, true);
INSERT INTO public."Students"
VALUES (
        1,
        'Nelson',
        'Muntz',
        'NS123',
        '2022-06-29 02:45:45.700',
        '2022-06-29 02:45:45.701',
        true,
        false
    ),
    (
        2,
        'Lisa',
        'Simpson',
        'NS456',
        '2022-06-29 02:53:14.669',
        '2022-06-29 02:53:14.669',
        true,
        false
    ),
    (
        3,
        'Bart',
        'Simpson',
        'BS123',
        '2022-06-29 03:00:32.159',
        '2022-06-29 03:00:32.159',
        true,
        false
    );
INSERT INTO public."Students_from_Courses"
VALUES (1, 1, 1),
    (2, 2, 1),
    (3, 3, 2);
INSERT INTO public."Subjects"
VALUES (1, 'Matematicas', true, false),
    (2, 'Fisica', true, false);
INSERT INTO public."Subject_Note_for_Student"
VALUES (1, 1, 1, 3.50),
    (3, 1, 2, 2.00),
    (2, 2, 1, 5.00),
    (4, 2, 2, 5.00),
    (5, 3, 1, 2.00);
INSERT INTO public."Subjects__from_Teachers"
VALUES (1, 1, 1);
INSERT INTO public."Roles" ("name")
VALUES ('ADMIN'),
    ('TEACHER');
INSERT INTO public."User" (
        "id",
        "names",
        "last_names",
        "email",
        "password",
        "roleId",
        "created_at",
        "updated_at",
        "status",
        "deleted"
    )
VALUES (
        2,
        'Carlos',
        'Quintero',
        'cquintero@gmail.com',
        '$2b$10$BlHkBYEoBfoAgEgHV/f7s.p8KHBtlaqoBsvAgowh00xJDza9nR9.W',
        1,
        '2022-07-06 03:33:26.503',
        '2022-07-06 03:33:26.503',
        true,
        false
    ),
    (
        3,
        'Daniel',
        'Millam',
        'dani.millan07@gmail.com',
        '$2b$10$vaan4r3w4Ur3dRTPGSxPcOGDqy2J7CgaRuQjFZA1cS0/aX5ZJk/K6',
        1,
        '2022-07-06 03:34:46.475',
        '2022-07-06 03:34:46.474',
        true,
        false
    );
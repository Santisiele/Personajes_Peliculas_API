
/****** Object:  Table [dbo].[PeliSerie]    Script Date: 11/5/2022 10:41:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PeliSerie](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[imagen] [varchar](max) NOT NULL,
	[titulo] [varchar](50) NOT NULL,
	[fechaCreacion] [varchar](50) NOT NULL,
	[clasificacion] [int] NOT NULL,
 CONSTRAINT [PK_PeliSerie] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Personaje]    Script Date: 11/5/2022 10:41:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Personaje](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[imagen] [varchar](255) NOT NULL,
	[nombre] [varchar](50) NOT NULL,
	[edad] [int] NOT NULL,
	[peso] [float] NOT NULL,
	[historia] [varchar](255) NOT NULL,
	[comidaFavorita] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Personaje] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PersonajeXPeliSerie]    Script Date: 11/5/2022 10:41:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PersonajeXPeliSerie](
	[idPeliSerie] [int] NOT NULL,
	[idPersonaje] [int] NOT NULL,
 CONSTRAINT [PK_PeliculaXSerie] PRIMARY KEY CLUSTERED 
(
	[idPeliSerie] ASC,
	[idPersonaje] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[PeliSerie] ON 

INSERT [dbo].[PeliSerie] ([id], [imagen], [titulo], [fechaCreacion], [clasificacion]) VALUES (1, N'piratasCaribe.jpg', N'Piratas', N'20/09/18', 4)
INSERT [dbo].[PeliSerie] ([id], [imagen], [titulo], [fechaCreacion], [clasificacion]) VALUES (4, N'simpsons.jpg', N'Simpsons movie', N'20/06/2008', 5)
SET IDENTITY_INSERT [dbo].[PeliSerie] OFF
GO
SET IDENTITY_INSERT [dbo].[Personaje] ON 

INSERT [dbo].[Personaje] ([id], [imagen], [nombre], [edad], [peso], [historia], [comidaFavorita]) VALUES (1, N'https://static.wikia.nocookie.net/hitlerparody/images/a/ab/Homer-simpson.jpg/revision/latest?cb=20180412155103&path-prefix=es', N'Homero', 35, 150, N'Homero es parte de la familia principal de los Simpsons', N'Donas')
INSERT [dbo].[Personaje] ([id], [imagen], [nombre], [edad], [peso], [historia], [comidaFavorita]) VALUES (3, N'lisa.jp', N'LisaSimpson', 11, 39, N'ok', N'veggie')
SET IDENTITY_INSERT [dbo].[Personaje] OFF
GO
INSERT [dbo].[PersonajeXPeliSerie] ([idPeliSerie], [idPersonaje]) VALUES (1, 1)
INSERT [dbo].[PersonajeXPeliSerie] ([idPeliSerie], [idPersonaje]) VALUES (4, 1)
GO
/****** Object:  StoredProcedure [dbo].[sp_Create]    Script Date: 11/5/2022 10:41:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Create]
@imagen varchar(255),
@nombre varchar(50),
@edad int,
@peso float,
@historia varchar(255),
@comidaFavorita varchar(50)
AS
BEGIN
INSERT INTO Personaje(imagen, nombre, edad, peso, historia, comidaFavorita) VALUES (@imagen, @nombre, @edad, @peso, @historia, @comidaFavorita)
END
GO
/****** Object:  StoredProcedure [dbo].[sp_DeleteByID]    Script Date: 11/5/2022 10:41:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_DeleteByID]
@id int
AS
BEGIN
DELETE FROM Personaje WHERE id = @id
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAll]    Script Date: 11/5/2022 10:41:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetAll]
AS
BEGIN
SELECT * FROM Personaje
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetByEdad]    Script Date: 11/5/2022 10:41:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetByEdad]
@edad int
AS
BEGIN
SELECT * FROM Personaje WHERE edad = @edad
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetByID]    Script Date: 11/5/2022 10:41:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetByID]
@id int
AS
BEGIN
SELECT * FROM Personaje WHERE id = @id
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetByNombre]    Script Date: 11/5/2022 10:41:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetByNombre]
@nombre varchar(50)
AS
BEGIN
SELECT * FROM Personaje WHERE nombre = @nombre
END
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateByID]    Script Date: 11/5/2022 10:41:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_UpdateByID]
@id int,
@imagen varchar(255),
@nombre varchar(50),
@edad int,
@peso float,
@historia varchar(255),
@comidaFavorita varchar(50)
AS
BEGIN
UPDATE Personaje SET imagen = @imagen, nombre = @nombre, edad = @edad, peso = @peso, historia = @historia, comidaFavorita = @comidaFavorita WHERE id = @Id
END
GO
USE [master]
GO
ALTER DATABASE [DAI-Personaje] SET  READ_WRITE 
GO

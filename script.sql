/****** Object:  User [Personaje]    Script Date: 31/5/2022 08:30:10 ******/
CREATE USER [Personaje] FOR LOGIN [Personaje] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [alumno]    Script Date: 31/5/2022 08:30:10 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [Personaje]
GO
/****** Object:  Table [dbo].[PeliSerie]    Script Date: 31/5/2022 08:30:10 ******/
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
/****** Object:  Table [dbo].[Personaje]    Script Date: 31/5/2022 08:30:10 ******/
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
/****** Object:  Table [dbo].[PersonajeXPeliSerie]    Script Date: 31/5/2022 08:30:10 ******/
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

INSERT [dbo].[PeliSerie] ([id], [imagen], [titulo], [fechaCreacion], [clasificacion]) VALUES (4, N'simpsons.jpg', N'Simpsons', N'20/06/2008', 5)
INSERT [dbo].[PeliSerie] ([id], [imagen], [titulo], [fechaCreacion], [clasificacion]) VALUES (9, N'SocialNetwork.jpg', N'SocialNetwork', N'20/03/2010', 5)
INSERT [dbo].[PeliSerie] ([id], [imagen], [titulo], [fechaCreacion], [clasificacion]) VALUES (10, N'Spiderman.jpg', N'Spiderman', N'20/9/2002', 4)
SET IDENTITY_INSERT [dbo].[PeliSerie] OFF
GO
SET IDENTITY_INSERT [dbo].[Personaje] ON 

INSERT [dbo].[Personaje] ([id], [imagen], [nombre], [edad], [peso], [historia], [comidaFavorita]) VALUES (3, N'lisa.jpg', N'LisaSimpson', 11, 39, N'ok', N'veggie')
INSERT [dbo].[Personaje] ([id], [imagen], [nombre], [edad], [peso], [historia], [comidaFavorita]) VALUES (4, N'Mark.jpg', N'Mark', 22, 50, N'creador de facebook', N'cerveza')
INSERT [dbo].[Personaje] ([id], [imagen], [nombre], [edad], [peso], [historia], [comidaFavorita]) VALUES (5, N'Saverin.jpg', N'EduardoSaverin', 21, 55, N'cofounder de facebook', N'cerveza')
INSERT [dbo].[Personaje] ([id], [imagen], [nombre], [edad], [peso], [historia], [comidaFavorita]) VALUES (6, N'Sean.jpg', N'SeanParker', 23, 45, N'cofounder de facebook', N'hamburguesas')
INSERT [dbo].[Personaje] ([id], [imagen], [nombre], [edad], [peso], [historia], [comidaFavorita]) VALUES (8, N'Homero.jpg', N'Homero', 40, 100, N'Papa de 3 hijos y esposo de Marge', N'todo')
SET IDENTITY_INSERT [dbo].[Personaje] OFF
GO
INSERT [dbo].[PersonajeXPeliSerie] ([idPeliSerie], [idPersonaje]) VALUES (4, 3)
INSERT [dbo].[PersonajeXPeliSerie] ([idPeliSerie], [idPersonaje]) VALUES (4, 8)
INSERT [dbo].[PersonajeXPeliSerie] ([idPeliSerie], [idPersonaje]) VALUES (9, 4)
INSERT [dbo].[PersonajeXPeliSerie] ([idPeliSerie], [idPersonaje]) VALUES (9, 5)
INSERT [dbo].[PersonajeXPeliSerie] ([idPeliSerie], [idPersonaje]) VALUES (9, 6)
INSERT [dbo].[PersonajeXPeliSerie] ([idPeliSerie], [idPersonaje]) VALUES (10, 5)
INSERT [dbo].[PersonajeXPeliSerie] ([idPeliSerie], [idPersonaje]) VALUES (10, 8)
GO
USE [master]
GO
ALTER DATABASE [DAI-Personaje] SET  READ_WRITE 
GO

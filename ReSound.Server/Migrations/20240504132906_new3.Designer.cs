﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using ReSound.Server.Data;

#nullable disable

namespace ReSound.Server.Migrations
{
    [DbContext(typeof(ReSoundContext))]
    [Migration("20240504132906_new3")]
    partial class new3
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("ReSound.Server.Data.Models.Comment", b =>
                {
                    b.Property<Guid>("IdComment")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Content")
                        .HasColumnType("text");

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("IdSequencer")
                        .HasColumnType("uuid");

                    b.Property<Guid>("IdUser")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("SequencerIdSequencer")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("UserIdUser")
                        .HasColumnType("uuid");

                    b.HasKey("IdComment");

                    b.HasIndex("SequencerIdSequencer");

                    b.HasIndex("UserIdUser");

                    b.ToTable("comment", (string)null);
                });

            modelBuilder.Entity("ReSound.Server.Data.Models.Follower", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid?>("FollowerUserIdUser")
                        .HasColumnType("uuid");

                    b.Property<Guid>("IdFollower")
                        .HasColumnType("uuid");

                    b.Property<Guid>("IdUser")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("UserIdUser")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("FollowerUserIdUser");

                    b.HasIndex("UserIdUser");

                    b.ToTable("follower", (string)null);
                });

            modelBuilder.Entity("ReSound.Server.Data.Models.Genre", b =>
                {
                    b.Property<Guid>("IdGenre")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("IdGenre");

                    b.ToTable("genre", (string)null);
                });

            modelBuilder.Entity("ReSound.Server.Data.Models.Mark", b =>
                {
                    b.Property<Guid>("IdMark")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("IdSequencer")
                        .HasColumnType("uuid");

                    b.Property<Guid>("IdUser")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("SequencerIdSequencer")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("UserIdUser")
                        .HasColumnType("uuid");

                    b.Property<int>("Value")
                        .HasColumnType("integer");

                    b.HasKey("IdMark");

                    b.HasIndex("SequencerIdSequencer");

                    b.HasIndex("UserIdUser");

                    b.ToTable("mark", (string)null);
                });

            modelBuilder.Entity("ReSound.Server.Data.Models.Sequencer", b =>
                {
                    b.Property<Guid>("IdSequencer")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime?>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<Guid>("IdSettingsSequencer")
                        .HasColumnType("uuid");

                    b.Property<Guid>("IdUser")
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Photo")
                        .HasColumnType("text");

                    b.Property<bool>("Private")
                        .HasColumnType("boolean");

                    b.Property<Guid?>("SettingsSequencerIdSettingsSequencer")
                        .HasColumnType("uuid");

                    b.Property<DateTime?>("Updated")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid?>("UserIdUser")
                        .HasColumnType("uuid");

                    b.HasKey("IdSequencer");

                    b.HasIndex("SettingsSequencerIdSettingsSequencer");

                    b.HasIndex("UserIdUser");

                    b.ToTable("sequencer", (string)null);
                });

            modelBuilder.Entity("ReSound.Server.Data.Models.SequencerGenre", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid?>("GenreIdGenre")
                        .HasColumnType("uuid");

                    b.Property<Guid>("IdGenre")
                        .HasColumnType("uuid");

                    b.Property<Guid>("IdSequencer")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("SequencerIdSequencer")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("GenreIdGenre");

                    b.HasIndex("SequencerIdSequencer");

                    b.ToTable("sequencer_genre", (string)null);
                });

            modelBuilder.Entity("ReSound.Server.Data.Models.SequencerTemplate", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("IdSequencer")
                        .HasColumnType("uuid");

                    b.Property<Guid>("IdTemplate")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("SequencerIdSequencer")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("TemplateIdTemplate")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("SequencerIdSequencer");

                    b.HasIndex("TemplateIdTemplate");

                    b.ToTable("sequencer_template", (string)null);
                });

            modelBuilder.Entity("ReSound.Server.Data.Models.SequencerTrack", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("IdSequencer")
                        .HasColumnType("uuid");

                    b.Property<Guid>("IdTrack")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("SequencerIdSequencer")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("TrackIdTrack")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("SequencerIdSequencer");

                    b.HasIndex("TrackIdTrack");

                    b.ToTable("sequencer_track", (string)null);
                });

            modelBuilder.Entity("ReSound.Server.Data.Models.SettingsSequencer", b =>
                {
                    b.Property<Guid>("IdSettingsSequencer")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int>("BPM")
                        .HasColumnType("integer");

                    b.Property<int>("Volume")
                        .HasColumnType("integer");

                    b.HasKey("IdSettingsSequencer");

                    b.ToTable("settings_sequencer", (string)null);
                });

            modelBuilder.Entity("ReSound.Server.Data.Models.Sound", b =>
                {
                    b.Property<Guid>("IdSound")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("FileName")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Path")
                        .HasColumnType("text");

                    b.HasKey("IdSound");

                    b.ToTable("sound", (string)null);
                });

            modelBuilder.Entity("ReSound.Server.Data.Models.Template", b =>
                {
                    b.Property<Guid>("IdTemplate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int>("BPM")
                        .HasColumnType("integer");

                    b.Property<Guid>("IdSound")
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Notes")
                        .HasColumnType("text");

                    b.Property<Guid?>("SoundIdSound")
                        .HasColumnType("uuid");

                    b.Property<int>("Volume")
                        .HasColumnType("integer");

                    b.HasKey("IdTemplate");

                    b.HasIndex("SoundIdSound");

                    b.ToTable("template", (string)null);
                });

            modelBuilder.Entity("ReSound.Server.Data.Models.Track", b =>
                {
                    b.Property<Guid>("IdTrack")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int>("Volume")
                        .HasColumnType("integer");

                    b.HasKey("IdTrack");

                    b.ToTable("track", (string)null);
                });

            modelBuilder.Entity("ReSound.Server.Data.Models.TrackTemplate", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("IdTemplate")
                        .HasColumnType("uuid");

                    b.Property<Guid>("IdTrack")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("TemplateIdTemplate")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("TrackIdTrack")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("TemplateIdTemplate");

                    b.HasIndex("TrackIdTrack");

                    b.ToTable("track_template", (string)null);
                });

            modelBuilder.Entity("ReSound.Server.Data.Models.User", b =>
                {
                    b.Property<Guid>("IdUser")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime?>("DateCreated")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("DateUpdated")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("Login")
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .HasColumnType("text");

                    b.Property<string>("Photo")
                        .HasColumnType("text");

                    b.HasKey("IdUser");

                    b.ToTable("users", (string)null);
                });

            modelBuilder.Entity("ReSound.Server.Data.Models.Comment", b =>
                {
                    b.HasOne("ReSound.Server.Data.Models.Sequencer", "Sequencer")
                        .WithMany()
                        .HasForeignKey("SequencerIdSequencer");

                    b.HasOne("ReSound.Server.Data.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserIdUser");

                    b.Navigation("Sequencer");

                    b.Navigation("User");
                });

            modelBuilder.Entity("ReSound.Server.Data.Models.Follower", b =>
                {
                    b.HasOne("ReSound.Server.Data.Models.User", "FollowerUser")
                        .WithMany()
                        .HasForeignKey("FollowerUserIdUser");

                    b.HasOne("ReSound.Server.Data.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserIdUser");

                    b.Navigation("FollowerUser");

                    b.Navigation("User");
                });

            modelBuilder.Entity("ReSound.Server.Data.Models.Mark", b =>
                {
                    b.HasOne("ReSound.Server.Data.Models.Sequencer", "Sequencer")
                        .WithMany()
                        .HasForeignKey("SequencerIdSequencer");

                    b.HasOne("ReSound.Server.Data.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserIdUser");

                    b.Navigation("Sequencer");

                    b.Navigation("User");
                });

            modelBuilder.Entity("ReSound.Server.Data.Models.Sequencer", b =>
                {
                    b.HasOne("ReSound.Server.Data.Models.SettingsSequencer", "SettingsSequencer")
                        .WithMany()
                        .HasForeignKey("SettingsSequencerIdSettingsSequencer");

                    b.HasOne("ReSound.Server.Data.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserIdUser");

                    b.Navigation("SettingsSequencer");

                    b.Navigation("User");
                });

            modelBuilder.Entity("ReSound.Server.Data.Models.SequencerGenre", b =>
                {
                    b.HasOne("ReSound.Server.Data.Models.Genre", "Genre")
                        .WithMany()
                        .HasForeignKey("GenreIdGenre");

                    b.HasOne("ReSound.Server.Data.Models.Sequencer", "Sequencer")
                        .WithMany()
                        .HasForeignKey("SequencerIdSequencer");

                    b.Navigation("Genre");

                    b.Navigation("Sequencer");
                });

            modelBuilder.Entity("ReSound.Server.Data.Models.SequencerTemplate", b =>
                {
                    b.HasOne("ReSound.Server.Data.Models.Sequencer", "Sequencer")
                        .WithMany()
                        .HasForeignKey("SequencerIdSequencer");

                    b.HasOne("ReSound.Server.Data.Models.Template", "Template")
                        .WithMany()
                        .HasForeignKey("TemplateIdTemplate");

                    b.Navigation("Sequencer");

                    b.Navigation("Template");
                });

            modelBuilder.Entity("ReSound.Server.Data.Models.SequencerTrack", b =>
                {
                    b.HasOne("ReSound.Server.Data.Models.Sequencer", "Sequencer")
                        .WithMany()
                        .HasForeignKey("SequencerIdSequencer");

                    b.HasOne("ReSound.Server.Data.Models.Track", "Track")
                        .WithMany()
                        .HasForeignKey("TrackIdTrack");

                    b.Navigation("Sequencer");

                    b.Navigation("Track");
                });

            modelBuilder.Entity("ReSound.Server.Data.Models.Template", b =>
                {
                    b.HasOne("ReSound.Server.Data.Models.Sound", "Sound")
                        .WithMany()
                        .HasForeignKey("SoundIdSound");

                    b.Navigation("Sound");
                });

            modelBuilder.Entity("ReSound.Server.Data.Models.TrackTemplate", b =>
                {
                    b.HasOne("ReSound.Server.Data.Models.Template", "Template")
                        .WithMany()
                        .HasForeignKey("TemplateIdTemplate");

                    b.HasOne("ReSound.Server.Data.Models.Track", "Track")
                        .WithMany()
                        .HasForeignKey("TrackIdTrack");

                    b.Navigation("Template");

                    b.Navigation("Track");
                });
#pragma warning restore 612, 618
        }
    }
}

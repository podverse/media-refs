import { IsEmail, IsUUID, Validate, ValidateIf } from 'class-validator'
import { BeforeInsert, Column, CreateDateColumn, Entity,
  OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm'

import { MediaRef, Playlist } from 'entities'
import { ValidatePassword } from 'entities/validation/password'
import { NowPlayingItem } from 'lib/utility/nowPlayingItem';

const shortid = require('shortid')

@Entity('users')
export class User {

  @PrimaryColumn('varchar', {
    default: shortid.generate(),
    length: 14
  })
  id: string

  @IsEmail()
  @Column({ unique: true })
  email: string

  @ValidateIf(a => a.emailVerificationToken != null)
  @IsUUID()
  @Column({
    nullable: true,
    unique: true
  })
  emailVerificationToken: string

  @Column({ nullable: true })
  emailVerificationTokenExpiration: Date

  @Column({ default: false })
  emailVerified: boolean

  @Column({ nullable: true })
  name: string

  @Validate(ValidatePassword)
  @Column()
  password: string

  @ValidateIf(a => a.resetPasswordToken != null)
  @IsUUID()
  @Column({
    nullable: true,
    unique: true
  })
  resetPasswordToken: string

  @Column({ nullable: true })
  resetPasswordTokenExpiration: Date

  @Column('varchar', { array: true })
  subscribedPodcastIds: string[]

  @Column('simple-json')
  queueItems: NowPlayingItem[]

  @OneToMany(type => MediaRef, mediaRefs => mediaRefs.owner)
  mediaRefs: MediaRef[]

  @OneToMany(type => Playlist, playlist => playlist.owner, {
    cascade: true
  })
  playlists: Playlist[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @BeforeInsert()
  beforeInsert () {
    this.id = shortid.generate()
    this.subscribedPodcastIds = this.subscribedPodcastIds || []
  }

}

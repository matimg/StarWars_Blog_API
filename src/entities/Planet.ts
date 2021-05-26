import {
    Entity, Column, PrimaryGeneratedColumn,
    BaseEntity, JoinTable, OneToMany
} from 'typeorm';
import { Favorite } from './Favorite';

@Entity()
export class Planet extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable: true})
    diameter: number;

    @Column({nullable: true})
    rotation_period: number;

    @Column({nullable: true})
    orbital_period: number;

    @Column({nullable: true})
    gravity: string;

    @Column({nullable: true})
    population: number;

    @Column({nullable: true})
    climate: string;

    @Column({nullable: true})
    terrain: string;

    @Column({nullable: true})
    surface_water: number;

    @Column()
    description: string;

    @Column({nullable: true})
    urlImage: string;

    @OneToMany(() => Favorite, favorite => favorite.planet)
    favorite: Favorite[];
}
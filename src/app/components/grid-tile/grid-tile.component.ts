import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { map } from 'rxjs';

import { ApiService } from 'src/app/service/api.service';

@Component({
    selector: 'app-grid-tiles',
    templateUrl: './grid-tile.component.html',
    styleUrls: ['./grid-tile.component.scss']
})
export class GridTilesComponent {
    @Input() public tabName: string;

    public searchForm: FormGroup;

    public imagesToDisplay: any[];
    public defaultImages: any[];
    public isModalVisible = false;
    public imageToDislay: any;

    constructor(
        private apiService: ApiService
    ) { }

    ngOnInit() {
        this.apiService.getImages(this.tabName).pipe(map(response => response.results)).subscribe(images => {
            this.defaultImages = images;
            this.imagesToDisplay = images;
        });

        this.searchForm = new FormGroup({ filter: new FormControl('', [Validators.required]) })
    }

    public openShowModal(image: any): void {
        this.isModalVisible = true;
        this.imageToDislay = image;
    }

    public closeModal(): void {
        this.isModalVisible = false;
        this.imageToDislay = null;
    }

    public onSubmit(images: any[]): void {
        const filterText = this.searchForm.value.filter;

        if (filterText) {
            const filteredImages = images.filter(image => image.description?.includes(filterText) || image.alt_description?.includes(filterText));
            this.imagesToDisplay = filteredImages;
        } else {
            this.searchForm.reset();
            this.imagesToDisplay = this.defaultImages;
        }
    }
}
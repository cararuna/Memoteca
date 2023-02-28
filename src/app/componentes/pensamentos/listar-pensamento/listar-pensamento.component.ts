import { PensamentoService } from './../pensamento.service';
import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css'],
})
export class ListarPensamentoComponent implements OnInit {
  listaPensamentos: Pensamento[] = [];

  haMaisPensamentos: boolean = true;
  paginaAtual: number = 1;

  constructor(private service: PensamentoService) {}

  ngOnInit(): void {
    this.service.listar(this.paginaAtual).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos;
    });
  }
  carregarMaisPensamentos() {
    this.service
      .listar(++this.paginaAtual)
      .subscribe((listaPensamentos) =>
        this.listaPensamentos.push(...listaPensamentos)
      );
    if (!this.listaPensamentos.length) {
      this.haMaisPensamentos = false;
    }
  }
}

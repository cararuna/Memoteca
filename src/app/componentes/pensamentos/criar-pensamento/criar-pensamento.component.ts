import { Router } from '@angular/router';
import { PensamentoService } from './../pensamento.service';
import { Pensamento } from './../pensamento';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css'],
})
export class CriarPensamentoComponent implements OnInit {
  formulario!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private formbuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formulario = this.formbuilder.group({
      conteudo: [
        'Formulário reativo',
        Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
          Validators.minLength(3),
        ]),
      ],
      autoria: [
        'Angular',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      modelo: ['modelo1'],
    });
  }

  habilitarBotao(): string {
    if (this.formulario.valid) {
      return 'botao';
    } else {
      return 'botao__desabilitado';
    }
  }

  criarPensamento() {
    console.log(this.formulario.get('conteudo')?.errors);

    if (this.formulario.valid) {
      this.service.criar(this.formulario.value).subscribe(() => {
        this.router.navigate(['/listarPensamento']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/listarPensamento']);
  }
}

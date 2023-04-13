<script setup>
import eModal from '@/components/event/eModal.vue'

defineProps({
  event: {
      required: true,
    },
})
</script>

<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-5 mx-auto my-5">
                <div class="card eventEdit">
                    <div class="card-header">
                        I'm EDIT page on <b>{{ event.title }}</b>
                    </div>
                    <div class="card-body">
                        @ {{ event.location }}
                    </div>
                    <div class="card-footer d-flex justify-content-around">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Edit
                        </button>
                        <div class="btn btn-danger"> Elimina</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

<eModal :event="event"/>
    
</template>

<style scoped>
.eventEdit{

}
</style>